import { assert } from "chai"
import { ethers } from "hardhat"
import { SimpleContract, SimpleContract__factory } from "../typechain-types"

describe("SimpleContract", function () {
    let contractFactory: SimpleContract__factory
    let contract: SimpleContract
    this.beforeEach(async function () {
        contractFactory = (await ethers.getContractFactory(
            "SimpleContract"
        )) as unknown as SimpleContract__factory
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
