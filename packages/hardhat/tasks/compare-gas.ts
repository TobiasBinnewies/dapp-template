import { spawn } from "child_process"
import fs from "fs"
import { task } from "hardhat/config"

interface GasReportEntry {
  index: number
  value: number
  length: number
}

const GAS_REPORT = "gas-report.txt"
const GAS_REPORT_PREVIOUS = "gas-report-previous.txt"

task("compare-gas", `Compares gas costs of ${GAS_REPORT} and ${GAS_REPORT_PREVIOUS}`).setAction(
  async () => {
    if (fs.existsSync(GAS_REPORT)) {
      fs.renameSync(GAS_REPORT, GAS_REPORT_PREVIOUS)
    }

    await new Promise<void>((resolve, reject) => {
      const ls = spawn("yarn", ["hardhat", "test"], {
        stdio: "inherit",
      })

      ls.on("error", (error) => {
        reject(error)
      })

      ls.on("close", (code) => {
        resolve()
      })
    })

    if (!fs.existsSync(GAS_REPORT) || !fs.existsSync(GAS_REPORT_PREVIOUS)) {
      console.log(`${GAS_REPORT} or ${GAS_REPORT_PREVIOUS} does not exist`)
      return
    }

    const gasReport = fs.readFileSync(GAS_REPORT, "utf8")
    const gasReportPrevious = fs.readFileSync(GAS_REPORT_PREVIOUS, "utf8")

    const parsedGasReport = parseGasReport(gasReport)
    const parsedGasReportPrevious = parseGasReport(gasReportPrevious)
    const comparedGasReports = compareGasReports(parsedGasReport, parsedGasReportPrevious)
    logGasReport(gasReport, comparedGasReports)
  }
)

function parseGasReport(gasReport: string): GasReportEntry[] {
  const regex = /(?<= )\d*\.?\d*(?= )/g
  const matches = [...gasReport.matchAll(regex)]
  let parsedGasReport: GasReportEntry[] = []
  matches.forEach(({ index, 0: value }) => {
    if (value === "" || index === undefined || index < 700) {
      return
    }
    const valueNum = Number(value)
    parsedGasReport.push({ index, value: valueNum, length: value.length })
  })
  return parsedGasReport
}

function compareGasReports(first: GasReportEntry[], second: GasReportEntry[]): GasReportEntry[] {
  if (first.length !== second.length) {
    console.log("Gas reports are not the same length [arrLength]]")
    throw new Error("Gas reports are not the same length [arrLength]]")
  }
  let compared: GasReportEntry[] = []
  for (let i = 0; i < first.length; i++) {
    const value1 = first[i]
    const value2 = second[i]
    compared.push({
      index: value1.index,
      value: value1.value - value2.value,
      length: value1.length,
    })
  }
  return compared
}

function logGasReport(oldGasReport: string, comparedObj: GasReportEntry[]): void {
  let newGasReport = oldGasReport
  comparedObj.reverse().forEach(({ index, value, length }) => {
    const regex = new RegExp("([\\S\\s]{" + index + "}).{" + length + "}")
    newGasReport = newGasReport.replace(
      regex,
      "$1" + value.toFixed(2).toString().padStart(length, " ")
    )
  })
  console.log(newGasReport)
}
