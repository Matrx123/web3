const { assert } = require("chai")
const { ethers } = require("hardhat")

describe("SimpleContract", function () {
    let contractFactory, contract
    this.beforeEach(async function () {
        contractFactory = await ethers.getContractFactory("SimpleContract")
        contract = await contractFactory.deploy()
    })

    it("Should start with a favourite number of 0", async function () {
        const currentValue = await contract.retrieve()
        const expectedValue = "0"
        //assert and expect
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should update when we call store function with any integer", async function () {
        const expectedValue = "55"
        const txn = await contract.store(expectedValue)
        await txn.wait(1)
        const updatedValue = await contract.retrieve()
        assert.equal(updatedValue.toString(), expectedValue)
    })
})

