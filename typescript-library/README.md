# About
Template for a TypeScript library.

## Create project from template
1. Install pipx if you don't have it yet: `python -m pip install pipx`
2. Run `pipx run cookiecutter https://github.com/mifeet/boilerplate-templates.git --directory="typescript-library"`
3. Fill in all the values when prompted

## Initial setup of the project
1. Run `npm install` inside the created directory.


# Features
Running `npm run build` will compile the TypeScript to both esm and cjs compatible formats.

In order to import the library from another TypeScript project directly (without having to re-build on every change),
you either need to change the entrypoint, or rely on the custom `typescript` [export condition](https://nodejs.org/api/packages.html#conditional-exports) 
included in `package.json`. In order to use the custom condition: 
  * add `"customConditions": ["typescript"]` to the `tsconfig.json` of the importing project.
  * if you are importing from a Next.js project, you also need to add a [custom webpack plugin](https://github.com/vercel/next.js/discussions/33813), add the library to `transpilePackages` in `next.config.js`, and abstain from using `--turbopack` in the `npm run dev` command.
