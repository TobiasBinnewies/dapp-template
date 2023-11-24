// @ts-ignore --> theres no import error when file in packages/hardhat/scripts
import { ethers } from "hardhat"

async function main() {}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
