const {task} = require("hardhat/config");

task("block-number", "Prints the current block number").setAction(async (taskArgs, hre) => {
    const blockNo = await hre.ethers.provider.getBlockNumber();
    console.log('Current Block No: ', blockNo);
})
