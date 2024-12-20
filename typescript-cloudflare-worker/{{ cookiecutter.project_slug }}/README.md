# {{ cookiecutter.project_description }}

See https://developers.cloudflare.com/workers/examples/openai-sdk-streaming/ for a simple TypeScript worker example implementation.

Note: There are two vitest configurations - one for testing with the Cloudflare Workers runtime (`vitest.config.worker.mts`) and one for regular unit tests (`vitest.config.mts`). The is so that Node.js SDKs that may not be available in the Cloudflare Workers runtime can be used in unit tests. 

