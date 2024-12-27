# About
Template for a TypeScript project ready to be deployed to a [Cloudflare worker](https://developers.cloudflare.com/workers/).

## Create project from template
1. Install pipx if you don't have it yet: `python -m pip install pipx`
2. Run `pipx run cookiecutter https://github.com/mifeet/boilerplate-templates.git --directory="typescript-cloudflare-worker"`
3. Fill in all the values when prompted

## Initial setup of the project
1. Run `npm install` inside the created directory.
2. Run `npm run cf-typegen` to regenerate the types for the Cloudflare Workers runtime.
