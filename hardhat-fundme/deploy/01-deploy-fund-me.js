const { network } = require("hardhat")
const { networkConfig, developmentChain } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress
    if (developmentChain.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    //make mocks when develop locally
    log("Deploying FundME ......")
    await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        logs: true,
    })
    log("FundMe Deployed......")
    log("----------------------------------------------")
}

module.exports.tags = ["all", "fundme"]
