#!/usr/bin/env node

const exec = require('child-process-promise').exec;

exec('ln -s ../api ./jobs/api').then(() => {
  process.exit();
});