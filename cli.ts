#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs";
import { migrate } from ".";

const args = yargs(hideBin(process.argv))
  .usage("Usage: loro-migrate [OPTIONS...]")
  .option("input", {
    alias: "i",
    describe: "The path of snapshot exported from before v0.16",
    type: "string",
  })
  .option("output", {
    alias: "o",
    describe: "The path of converted snapshot of v0.16",
    type: "string",
  })
  .help()
  .alias("help", "h");

const argv = args.argv;

// @ts-ignore
const inputPath = argv.input || argv._[0];
// @ts-ignore
const outputPath = argv.output || argv._[1];

if (!inputPath || !outputPath) {
  console.error("Please provide input and output path\n");
  args.showHelp();
  process.exit(1);
}

const data = fs.readFileSync(inputPath);
const snapshot = migrate(data);
fs.writeFileSync(outputPath, snapshot);
console.log("🦜 Snapshot converted successfully");
