#!/usr/bin/env node

const exec = require('child-process-promise').exec;

console.log('<<< Jobs Configuration >>>');

exec('ln -s ../api ./jobs/api').then(() => {
  process.exit();
});
