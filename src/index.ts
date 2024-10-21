#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs";
import { LoroVersion, migrate } from "./migrate";
export { LoroVersion, migrate } from "./migrate";

const args = yargs(hideBin(process.argv))
  .usage("Usage: loro-migrate [OPTIONS...]")
  .option("input", {
    alias: "i",
    describe: "The path of snapshot exported from before v1.0",
    type: "string",
  })
  .option("output", {
    alias: "o",
    describe: "The path of converted snapshot of v1.0",
    type: "string",
  })
  .option("from", {
    alias: "f",
    describe:
      "The loro version of the input snapshot, choose from `v0.15`, `v0.16`",
    type: "string",
  })
  .help()
  .alias("help", "h");

const argv = args.argv;

// @ts-ignore
const inputPath = argv.input || argv._[0];
// @ts-ignore
const outputPath = argv.output || argv._[1];
// @ts-ignore
const fromVersion = argv.from || argv._[2];

if (!inputPath || !outputPath) {
  console.error("Please provide input and output path\n");
  args.showHelp();
  process.exit(1);
}

let from;
switch (fromVersion) {
  case "v0.15":
    from = LoroVersion.V015;
    break;
  case "v0.16":
    from = LoroVersion.V016;
    break;
  default:
    console.error(
      "The loro version of the input snapshot, should be `v0.15` or `v0.16`"
    );
    args.showHelp();
    process.exit(1);
}

const data = fs.readFileSync(inputPath);
const snapshot = migrate(data, from);
fs.writeFileSync(outputPath, snapshot);
console.log("🦜 Snapshot converted successfully");
