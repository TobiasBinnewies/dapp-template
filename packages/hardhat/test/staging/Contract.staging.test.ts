import { getNetworkConfig } from "../../helper-hardhat-config"
import { network } from "hardhat"

const config = getNetworkConfig(network.config.chainId)

!config.isDevelopment ? describe.skip : describe("Contract Unit Tests", () => {})
