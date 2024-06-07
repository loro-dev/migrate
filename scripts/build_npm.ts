// ex. scripts/build_npm.ts
import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
  entryPoints: [
    {
      kind: "bin",
      name: "loro-migrate",
      path: "src/main.ts",
    },
  ],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },

  mappings: {
    // "npm:loro-crdt@0.15.5-alpha.0": {
    //   name: "loro-crdt",
    //   version: "0.15.5-alpha.0",
    // },
    // "npm:loro-crdt@0.16.4-alpha.0": {
    //   name: "loro-crdt",
    //   version: "0.16.4-alpha.0",
    // },
  },

  package: {
    // package.json properties
    name: "loro-migrate",
    version: Deno.args[0],
    description: "migration tool for Loro CRDT",
    license: "MIT",
    // repository: {
    //   type: "git",
    //   url: "git+https://github.com/username/repo.git",
    // },
    // bugs: {
    //   url: "https://github.com/username/repo/issues",
    // },
  },
  postBuild() {
    // steps to run after building and before running the tests
    // Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
