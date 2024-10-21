#!/usr/bin/env node
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
import { Loro as Loro$1 } from 'loro-crdt-v015';
import { Loro } from 'loro-crdt-v016';
import { LoroDoc } from 'loro-crdt';

var LoroVersion = /* @__PURE__ */ ((LoroVersion2) => {
  LoroVersion2[LoroVersion2["V015"] = 0] = "V015";
  LoroVersion2[LoroVersion2["V016"] = 1] = "V016";
  LoroVersion2[LoroVersion2["V1_0"] = 2] = "V1_0";
  return LoroVersion2;
})(LoroVersion || {});
const migrate = (inputSnapshot, from) => {
  if (from >= 2 /* V1_0 */) {
    throw "`from` version should be smaller than `v1.0` version";
  }
  let jsonOld;
  switch (from) {
    case 0 /* V015 */:
      const loro15 = new Loro$1();
      loro15.import(inputSnapshot);
      jsonOld = loro15.exportJsonUpdates();
      break;
    case 1 /* V016 */:
      const loro16 = new Loro();
      loro16.import(inputSnapshot);
      jsonOld = loro16.exportJsonUpdates();
      break;
    case 2 /* V1_0 */:
      throw "the loro version of `from` should not be `v1.0`";
  }
  const doc = new LoroDoc();
  doc.importJsonUpdates(jsonOld);
  return doc.export({ mode: "snapshot" });
};

const args = yargs(hideBin(process.argv)).usage("Usage: loro-migrate [OPTIONS...]").option("input", {
  alias: "i",
  describe: "The path of snapshot exported from before v1.0",
  type: "string"
}).option("output", {
  alias: "o",
  describe: "The path of converted snapshot of v1.0",
  type: "string"
}).option("from", {
  alias: "f",
  describe: "The loro version of the input snapshot, choose from `v0.15`, `v0.16`",
  type: "string"
}).help().alias("help", "h");
const argv = args.argv;
const inputPath = argv.input || argv._[0];
const outputPath = argv.output || argv._[1];
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
console.log("\u{1F99C} Snapshot converted successfully");

export { LoroVersion, migrate };
