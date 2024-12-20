import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: false,
    environment: "node",
    include: ["{src,test}/**/*.test.ts"],
    exclude: ["{src,test}/**/*.worker.test.ts"],
  },
});
