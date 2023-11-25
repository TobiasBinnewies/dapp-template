import { getNetworkConfig } from "../helper-hardhat-config";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";


const deployMocks: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  network,
}: HardhatRuntimeEnvironment) {
  const config = getNetworkConfig(network.config.chainId)

  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  if (!config.isDevelopment) {
    return
  }
  log("Deploying mocks...")

  const args: any[] = []
  await deploy("...", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: config.blockConfirmations,
  })

  log("Mocks deployed!")
  log("------------------")
}

deployMocks.tags = ["all", "mocks"]

export default deployMocks