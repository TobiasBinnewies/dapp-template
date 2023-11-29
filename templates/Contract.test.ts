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

        // For Events [1]
        await new Promise<void>(async (resolve, reject) => {
          setTimeout(async () => reject("Timeout"), 300000) // 5 min
          await contract.once("...", async (/* Event Attributes */) => {
            // ...
            resolve()
          })
          await contract.function()
        })

        // For Events [2]
        const tx = await contract.function()
        const receipt = await tx.wait()
        const event = receipt?.logs.find(
          (e) => (e as EventLog).eventName === "..."
        ) as EventLog
        if (!mintedEvent) {
          throw new Error("No ... event found")
        }
        // ... --> event.args.[...]
    })

    describe("contructor", () => {})

    describe("function", () => {})
})