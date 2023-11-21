import { ethers } from "hardhat"

type NetworkConfigItem = {
  name: string
  // fundAmount: BigInt
  // fee?: string
  // keyHash?: string
  // interval?: string
  // linkToken?: string
  callbackGasLimit: bigint
  gasLane: string
  blockConfirmations: number
  // keepersUpdateInterval?: string
  // oracle?: string
  // jobId?: string
  // ethUsdPriceFeed?: string
}

type DevelopmentNetworkConfigItem = NetworkConfigItem & {
  isDevelopment: true
  gasPriceLink: bigint
}

type NonDevelopmentNetworkConfigItem = NetworkConfigItem & {
  isDevelopment: false
  vrfCoordinator: string
  ethUsdPriceFeed: string
  subscriptionId: string
}

type NetworkConfigMap = {
  [chainId: string]: NonDevelopmentNetworkConfigItem | DevelopmentNetworkConfigItem
}

const networkConfig: NetworkConfigMap = {
  31337: {
    isDevelopment: true,
    name: "localhost",
    callbackGasLimit: ethers.parseUnits("500000", "wei"), // 500k gas
    gasPriceLink: ethers.parseUnits("0.0000000001", "ether"), // 0.1 gwei
    gasLane: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c", // doesnt matter
    blockConfirmations: 1,
  },
  //   1: {
  //     name: "mainnet",
  //     callbackGasLimit: 500000n,
  //   },
  11155111: {
    isDevelopment: false,
    name: "sepolia",
    vrfCoordinator: "0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625", // from https://docs.chain.link/vrf/v2/subscription/supported-networks
    subscriptionId: "6516",
    callbackGasLimit: ethers.parseUnits("500000", "wei"), // 500k gas
    gasLane: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c", // from https://docs.chain.link/vrf/v2/subscription/supported-networks
    blockConfirmations: 1,
    ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306", // from https://docs.chain.link/docs/ethereum-addresses/
  },
  //   137: {
  //     name: "polygon",
  //     linkToken: "0xb0897686c545045afc77cf20ec7a532e3120e0f1",
  //     ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
  //     oracle: "0x0a31078cd57d23bf9e8e8f1ba78356ca2090569e",
  //     jobId: "12b86114fa9e46bab3ca436f88e1a912",
  //     fee: "100000000000000",
  //   },
}

export function getNetworkConfig(
  chainId?: number
): NonDevelopmentNetworkConfigItem | DevelopmentNetworkConfigItem {
  if (chainId === undefined) {
    throw Error("No chainId provided")
  }
  const config = networkConfig[chainId]
  if (config === undefined) {
    throw Error(`No network config for chainId ${chainId}`)
  }
  return config
}
