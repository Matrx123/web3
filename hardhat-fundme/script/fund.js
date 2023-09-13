const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log("Funding Contract...")
    const txnResponse = await fundMe.fund({
        value: ethers.parseEther("1"),
    })
    await txnResponse.wait(1)
    console.log("Contract Funded...")
}

main()
    .then(() => {
        process.exit(0)
    })
    .catch((error) => {
        console.log("Script fundme Error: ", error)
        process.exit(1)
    })
