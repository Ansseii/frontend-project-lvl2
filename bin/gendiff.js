#! /usr/bin/env node

import { program } from 'commander';
import getDiff from '../src/gendiff.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((f1, f2) => console.log(getDiff(f1, f2, program.opts().format)))
  .parse(process.argv);
