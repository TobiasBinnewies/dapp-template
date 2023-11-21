import "./tasks/compare-gas";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import "hardhat-deploy";
import { HardhatUserConfig } from "hardhat/config";


dotenv.config()


if (process.env.SEPOLIA_RPC_URL === undefined) {
  throw "Please set the SEPOLIA_RPC_URL environment variable"
}
if (process.env.MAINNET_RPC_URL === undefined) {
  throw "Please set the MAINNET_RPC_URL environment variable"
}
if (process.env.DEPLOYER_PRIVATE_KEY === undefined) {
  throw "Please set the DEPLOYER_PRIVATE_KEY environment variable"
}
if (process.env.ETHERSCAN_API_KEY === undefined) {
  throw "Please set the ETHERSCAN_API_KEY environment variable"
}
if (process.env.COINMARKETCAP_API_KEY === undefined) {
  throw "Please set the COINMARKETCAP_API_KEY environment variable"
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.19" }],
  },
  defaultNetwork: "localhost",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
      chainId: 11155111,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
    hardhat: {
      chainId: 31337,
      forking: {
        url: process.env.MAINNET_RPC_URL,
        enabled: process.env.MAINNET_FORKING_ENABLED === "true",
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    noColors: true,
    // token: 'MATIC',
    outputFile: "gas-report.txt",
  },
  mocha: {
    timeout: 300000, // 300s / 5min
  },
}

export default config