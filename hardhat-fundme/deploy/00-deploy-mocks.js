const { network } = require("hardhat")
const {
    developmentChain,
    DECIMALS,
    INITIAL_ANSWERS,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    if (developmentChain.includes(network.name)) {
        log("----------------------------------------------")
        log("Local network detected, deploying mocks......")
        await deploy("MockV3Aggregator", {
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWERS],
        })
        log("Mock Deployed......")
        log("----------------------------------------------")
    }
}
module.exports.tags = ["all", "mocks"]

