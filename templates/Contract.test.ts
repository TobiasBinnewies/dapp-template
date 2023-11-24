// @ts-nocheck --> theres no import error when file in packages/hardhat/test/[unit/staging]
import { getNetworkConfig } from "../../helper-hardhat-config";
import { expect } from "chai";
import { ethers, network, deployments } from "hardhat";


const config = getNetworkConfig(network.config.chainId)

!config.isDevelopment ? describe.skip : describe("Contract Unit Tests", () => {
    let contract: Contract
    let deployer: HardhatEthersSigner

    beforeEach(async () => {
        const accounts = await ethers.getSigners()
        deployer = accounts[0]

        await deployments.fixture(["all"])

        const Contract = await deployments.get("...")
        contract = await ethers.getContractAt(
          "...",
          Contract.address,
          deployer
        )

        // For Events
        await new Promise<void>(async (resolve, reject) => {
          setTimeout(async () => reject("Timeout"), 300000) // 5 min
          await basicNft.once("...", async (id: number) => {
            // ...
            resolve()
          })
          await contract.function()
        })
    })

    describe("contructor", () => {})

    describe("function", () => {})
})