const { assert, expect } = require("chai")
const { ethers, getNamedAccounts, network } = require("hardhat")
const { developmentChain } = require("../../helper-hardhat-config")

developmentChain.includes(network.name)
    ? describe.skip
    : describe("FundMe", function () {
          let fundMe
          let deployer
          const sendValue = ethers.parseEther("0.5") // 1 ETH
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          describe("fund", function () {
              it("Fails when we dont send enough ETH", async function () {
                  await expect(fundMe.fund()).to.be.revertedWith(
                      "You need to spend more ETH!",
                  )
              })
              it("updated the amount funded data structure", async function () {
                  await fundMe.fund({ value: sendValue })
                  const response =
                      await fundMe.getAddressToAmountMapping(deployer)
                  assert.equal(response.toString(), sendValue.toString())
              })
              it("Adds funder to array of s_funders", async function () {
                  await fundMe.fund({ value: sendValue })
                  const funder = await fundMe.getFunder(0)
                  assert.equal(funder, deployer)
              })
              describe("withdraw", function () {
                  this.beforeEach(async function () {
                      await fundMe.fund({ value: sendValue })
                  })
                  it("Withdraw from a single account type list", async function () {
                      //initial balances
                      const initialFundMeBalance =
                          await ethers.provider.getBalance(fundMe.target)
                      const initialDeployerBalance =
                          await ethers.provider.getBalance(deployer)

                      //withdraw balance from single account list
                      const txn = await fundMe.withdraw()
                      const txn_receipt = await txn.wait(1)
                      //final balances
                      const finalFundMeBalance =
                          await ethers.provider.getBalance(fundMe.target)
                      const finalDeployerBalance =
                          await ethers.provider.getBalance(deployer)

                      const total_gasPrice =
                          txn_receipt.gasUsed * txn_receipt.gasPrice

                      assert.equal(finalFundMeBalance, 0)
                      assert.equal(
                          (
                              initialFundMeBalance + initialDeployerBalance
                          ).toString(),
                          (finalDeployerBalance + total_gasPrice).toString(),
                      )
                  })
                  it("Withdraw from multiple accounts type list", async function () {
                      const accounts = await ethers.getSigners()
                      for (let i = 1; i < accounts.length; i++) {
                          const fundMeConnectedContract = await fundMe.connect(
                              accounts[i],
                          )
                          await fundMeConnectedContract.fund({
                              value: sendValue,
                          })
                      }
                      const initialFundMebalance =
                          await ethers.provider.getBalance(fundMe.target)
                      const initialDeployerBalance =
                          await ethers.provider.getBalance(deployer)

                      const txn = await fundMe.withdraw()
                      const txn_receipt = await txn.wait(1)
                      const finalFundMeBalance =
                          await ethers.provider.getBalance(fundMe.target)
                      const finalDeployerBalance =
                          await ethers.provider.getBalance(deployer)
                      const total_gas =
                          txn_receipt.gasUsed * txn_receipt.gasPrice

                      assert.equal(finalFundMeBalance, 0)
                      assert.equal(
                          (
                              initialFundMebalance + initialDeployerBalance
                          ).toString(),
                          (finalDeployerBalance + total_gas).toString(),
                      )
                      //make sure s_funders is properly set
                      await expect(fundMe.getFunder(0)).to.be.reverted
                      for (let i = 1; i < accounts.length; i++) {
                          assert.equal(
                              await fundMe.getAddressToAmountMapping(
                                  accounts[i].address,
                              ),
                              0,
                          )
                      }
                  })

                  it("only allows owner to withdraw funds", async function () {
                      const accounts = await ethers.getSigners()
                      const attacker = accounts[1]
                      const connectedAttacker = await fundMe.connect(attacker)
                      await expect(
                          connectedAttacker.withdraw(),
                      ).to.be.revertedWithCustomError(
                          fundMe,
                          "FundMe__NotOwner",
                      )
                  })

                  it("Withdraw cheaply with multiple account list", async function () {
                      const accounts = await ethers.getSigners()
                      for (let i = 1; i < accounts.length; i++) {
                          const fundMeConnectedContract = await fundMe.connect(
                              accounts[i],
                          )
                          await fundMeConnectedContract.fund({
                              value: sendValue,
                          })
                      }
                      const initialFundMebalance =
                          await ethers.provider.getBalance(fundMe.target)
                      const initialDeployerBalance =
                          await ethers.provider.getBalance(deployer)

                      const txn = await fundMe.cheaperWithdraw()
                      const txn_receipt = await txn.wait(1)
                      const finalFundMeBalance =
                          await ethers.provider.getBalance(fundMe.target)
                      const finalDeployerBalance =
                          await ethers.provider.getBalance(deployer)
                      const total_gas =
                          txn_receipt.gasUsed * txn_receipt.gasPrice

                      assert.equal(finalFundMeBalance, 0)
                      assert.equal(
                          (
                              initialFundMebalance + initialDeployerBalance
                          ).toString(),
                          (finalDeployerBalance + total_gas).toString(),
                      )
                      //make sure s_funders is properly set
                      await expect(fundMe.getFunder(0)).to.be.reverted
                      for (let i = 1; i < accounts.length; i++) {
                          assert.equal(
                              await fundMe.getAddressToAmountMapping(
                                  accounts[i].address,
                              ),
                              0,
                          )
                      }
                  })
                  it("Cheaply withdraw from a single account type list", async function () {
                      //initial balances
                      const initialFundMeBalance =
                          await ethers.provider.getBalance(fundMe.target)
                      const initialDeployerBalance =
                          await ethers.provider.getBalance(deployer)

                      //withdraw balance from single account list
                      const txn = await fundMe.cheaperWithdraw()
                      const txn_receipt = await txn.wait(1)
                      //final balances
                      const finalFundMeBalance =
                          await ethers.provider.getBalance(fundMe.target)
                      const finalDeployerBalance =
                          await ethers.provider.getBalance(deployer)

                      const total_gasPrice =
                          txn_receipt.gasUsed * txn_receipt.gasPrice

                      assert.equal(finalFundMeBalance, 0)
                      assert.equal(
                          (
                              initialFundMeBalance + initialDeployerBalance
                          ).toString(),
                          (finalDeployerBalance + total_gasPrice).toString(),
                      )
                  })
              })
          })
      })

