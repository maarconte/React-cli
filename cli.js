#!/usr/bin/env node

var program = require('commander');
let Commands = require('./Commands.js'); // All commands actions

/* Define commands */
program
  .option('-c, --create [value]', 'Create a react component')
  .option('--config [value]', 'Update the config file')
  .parse(process.argv);

/* Define actions of each command */
if (program.create !== true && typeof program.create !== 'undefined') {
  const commands = new Commands(program);
  commands.create();
}

if (program.config !== true && typeof program.config !== 'undefined') {
  const commands = new Commands(program);
  commands.config();
}