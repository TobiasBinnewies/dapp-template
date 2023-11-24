import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { getNetworkConfig } from "../helper-hardhat-config"
import { verify } from "../utils/verify"

const deploy: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  network,
}: HardhatRuntimeEnvironment) {
  const config = getNetworkConfig(network.config.chainId)

  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const args: any[] = []
  const deployResult = await deploy("...", {
    from: deployer,
    args: args,
    log: true,
  })

  if (!config.isDevelopment && process.env.ETHERSCAN_API_KEY) {
    log("Verifying on Etherscan")
    await verify(deployResult.address, args)
  }
}

deploy.tags = ["all", "...", "main"]

export default deploy
