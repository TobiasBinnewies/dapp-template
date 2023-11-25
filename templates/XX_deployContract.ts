// @ts-nocheck --> theres no import error when file in packages/hardhat/deploy
import { getNetworkConfig } from "../helper-hardhat-config";
import { verify } from "../utils/verify";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";


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
    waitConfirmations: config.blockConfirmations,
  })

  if (!config.isDevelopment && process.env.ETHERSCAN_API_KEY) {
    log("Verifying on Etherscan")
    await verify(deployResult.address, args)
  }
}

deploy.tags = ["all", "...", "main"]

export default deploy