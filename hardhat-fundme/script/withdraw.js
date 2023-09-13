const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log("Withdrawing Funds...")
    const txnResponse = await fundMe.withdraw()
    await txnResponse.wait()
    console.log("Funds Withdrawn...")
}

main()
    .then(() => {
        process.exit(0)
    })
    .then((error) => {
        console.log("Error Withdraw funds script: ", error)
        process.exit(1)
    })
