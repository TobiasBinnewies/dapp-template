// @ts-ignore --> theres no import error when file in packages/hardhat/test/[unit/staging]
import { getNetworkConfig } from "../../helper-hardhat-config"
import { network } from "hardhat"

const config = getNetworkConfig(network.config.chainId)

!config.isDevelopment ? describe.skip : describe("Contract Unit Tests", () => {})
