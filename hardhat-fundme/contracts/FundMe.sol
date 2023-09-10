const { network, run } = require("hardhat")
const { networkConfig, developmentChain } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

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
    const fundMeTxn = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        logs: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log("FundMe Deployed on Address: ", fundMeTxn?.address)
    log("----------------------------------------------")
    if (
        !developmentChain.includes(network.name) &&
        process.env.ETH_SCN_API_KEY
    ) {
        //verify code
        verify(fundMeTxn?.address, [ethUsdPriceFeedAddress])
    }
    log("----------------------------------------------")
}

module.exports.tags = ["all", "fundme"]
