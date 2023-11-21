import { run } from "hardhat"

export async function verify(contractAddress: string, args: any) {
  console.log("Verifying contract at address:", contractAddress)
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if ((e as Error).message.toLowerCase().includes("already verified")) {
      console.log("Contract already verified")
      return
    }
    console.log("Error verifying contract:", e)
  }
}
