import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    "globals": false,
    "include": [
      "src/**/*.test.ts"
    ]
  },
})