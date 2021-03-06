#!/usr/bin/env node

const prompt = require('prompt');
const writeToEnvFile = require('./util').writeToEnvFile;

console.log('<<< Filestore Configuration >>>');

prompt.start();
prompt.get([
  {
    description: 'AWS access key ID',
    name: 'accessKeyId'
  },
  {
    description: 'AWS secret access key',
    name: 'secretAccessKey'
  }
], (err, result) => {
  if (err) {
    console.error(err);
  } else {
    writeToEnvFile('.env', 'AWS_ACCESS_KEY_ID', result.accessKeyId);
    writeToEnvFile('.env', 'AWS_SECRET_ACCESS_KEY', result.secretAccessKey);
    console.log('AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY added to the .env file.');
  }
});
