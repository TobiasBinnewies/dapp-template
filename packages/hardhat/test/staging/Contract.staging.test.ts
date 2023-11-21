import { developmentChains } from "../../helper-hardhat-config"
import { network } from "hardhat"

developmentChains.includes(network.name) ? describe.skip : describe("Contract Unit Tests", () => {})
