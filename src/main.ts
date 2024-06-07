// import { Loro as LoroV15 } from "npm:loro-crdt@0.15.5-alpha.0";
import { Loro as LoroV16 } from "npm:loro-crdt@0.16.4-alpha.0";
import { parse } from "https://deno.land/std@0.200.0/flags/mod.ts";
import type { Args } from "https://deno.land/std@0.200.0/flags/mod.ts";

const printHelp = () => {
  console.log(`Loro Migrate CLI`);
  console.log("");
  console.log(`Usage: loro-migrate [OPTIONS...]`);
  console.log("\nOptional flags:");
  console.log("  -h, --help                Display help");
  console.log(
    "  -i, --input               The path of snapshot exported from before v0.16"
  );
  console.log(
    "  -o, --output              The path of converted snapshot of v0.16"
  );
};

function parseArguments(args: string[]): Args {
  // All boolean arguments
  const booleanArgs = ["help"];

  // All string arguments
  const stringArgs = ["input", "output"];

  // And a list of aliases
  const alias = {
    help: "h",
    input: "i",
    output: "o",
  };

  return parse(args, {
    alias,
    boolean: booleanArgs,
    string: stringArgs,
    stopEarly: false,
    "--": true,
  });
}

const args = parseArguments(Deno.args);

// If help flag enabled, print help.
if (args.help) {
  printHelp();
  Deno.exit(0);
}

let inputPath: string | null = args.input || args._[0];
let outputPath: string | null = args.output || args._[1];

if (!inputPath || !outputPath) {
  console.error("Please provide input and output path");
  Deno.exit(1);
}

const data = Deno.readFileSync(inputPath);
const loro = new LoroV16();
loro.import(data);
// @ts-ignore
const jsonObj = loro.exportJsonUpdates();
const loroNew = new LoroV16();
// @ts-ignore
loroNew.importJsonUpdates(jsonObj);
const snapshot = loroNew.exportSnapshot();
Deno.writeFileSync(outputPath, snapshot);
console.log("Snapshot converted successfully");
