const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")

describe("FundMe", function () {
    let fundMe
    let deployer
    let mockV3Aggregator
    const sendValue = ethers.parseEther("1") // 1 ETH
    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)
        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer,
        )
    })
    describe("constructor", () => {
        it("sets the aggregator address correctly", async function () {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.target)
        })
    })

    describe("fund", function () {
        it("Fails when we dont send enough ETH", async function () {
            await expect(fundMe.fund()).to.be.revertedWith(
                "You need to spend more ETH!",
            )
        })
        it("updated the amount funded data structure", async function () {
            await fundMe.fund({ value: sendValue })
            const response = await fundMe.addressToAmount(deployer)
            assert.equal(response.toString(), sendValue.toString())
        })
        it("Adds funder to array of funders", async function () {
            await fundMe.fund({ value: sendValue })
            const funder = await fundMe.funders(0)
            assert.equal(funder, deployer)
        })
        describe("withdraw", function () {
            this.beforeEach(async function () {
                await fundMe.fund({ value: sendValue })
            })
            it("Withdraw from a single account type list", async function () {
                //initial balances
                const initialFundMeBalance = await ethers.provider.getBalance(
                    fundMe.target,
                )
                const initialDeployerBalance =
                    await ethers.provider.getBalance(deployer)
                //withdraw balance from single account list
                const txn = await fundMe.withdraw()
                await txn.wait(1)
                //final balances
                const finalFundMeBalance = await ethers.provider.getBalance(
                    fundMe.target,
                )
                const finalDeployerBalance =
                    await ethers.provider.getBalance(deployer)
                assert.equal(finalFundMeBalance, 0)
                assert.equal(
                    initialFundMeBalance.add(initialDeployerBalance).toString(),
                    finalDeployerBalance.add(txn.gasPrice).toString(),
                )
            })
        })
    })
})
