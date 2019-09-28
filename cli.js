#!/usr/bin/env node

var program = require('commander');
let Commands = require('./Commands.js'); // All commands actions

/* Define commands */
program
  .option('-c, --create [value]', 'Create a react component')
  .option('--config [value]', 'Update the config file')
  .parse(process.argv);

/* Define actions of each command */
const commands = new Commands(program);
if (program.create) {
  commands.create();
}
if (program.config) {
  commands.config();
}