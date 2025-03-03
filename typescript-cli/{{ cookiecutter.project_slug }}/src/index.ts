#!npx tsx

import { program } from 'commander';
import "process";

interface Options {
  option: number;
}

program
  .name('{{ cookiecutter.binary_name }}')
  .description('{{ cookiecutter.project_description }}')
  .argument('<arg>', 'An argument')
  .option('-o, --option <number>', 'An option', '5')
  .action(async (arg: string, options: Options) => {
    console.log(`Hello world! Argument: ${arg}, Option: ${options.option}`);
  });

program.parse(process.argv);