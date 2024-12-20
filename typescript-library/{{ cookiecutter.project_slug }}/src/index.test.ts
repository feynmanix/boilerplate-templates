import { expect, test } from "vitest";

import libraryFunction from "./index";

test("libraryFunction returns expected greeting", () => {
  expect(libraryFunction()).toBe("Hello, world!");
});
