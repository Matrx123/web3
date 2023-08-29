require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();
require("./tasks/block-number");

/** @type import('hardhat/config').HardhatUserConfig */

const RPC_URL = process.env.RPC_URL;
const PVT_KEY = process.env.PVT_KEY;
const ETH_SCN_KEY = process.env.ETH_SCN_API_KEY

module.exports = {
  defaultNetwork: "hardhat",
  networks:{
    sepolia :{
      url : RPC_URL,
      accounts: [PVT_KEY],
    },
    dev :{
      url : 'http://127.0.0.1:8545/',
      chainId: 31337,
    }
  },
  etherscan:{
    apiKey : ETH_SCN_KEY
  },
  solidity: "0.8.8",
};
