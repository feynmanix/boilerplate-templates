import libraryFunction from "github-test";
import { test } from "node:test";
import assert from "node:assert";

test("libraryFunction", () => {
  assert(libraryFunction() === "Hello, world!");
});