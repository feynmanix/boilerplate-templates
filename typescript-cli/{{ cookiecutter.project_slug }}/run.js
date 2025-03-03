#!/usr/bin/env node
import { execFileSync } from "child_process";
import path from "path";
import { exit } from "process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
try {
  execFileSync(
    "npx",
    [
      "tsx",
      "--tsconfig",
      path.resolve(__dirname, "tsconfig.build.json"),
      path.resolve(__dirname, "src/index.ts"),
      ...process.argv.slice(2),
    ],
    {
      stdio: "inherit",
    }
  );
} catch (e) {
  exit(1);
}
