#!/usr/bin/env node

const prompt = require('prompt');
const writeToEnvFile = require('./util').writeToEnvFile;

console.log('<<< Deployment Configuration >>>');

prompt.start();
prompt.get([
  {
    description: 'Staging MongoDB Server IP',
    name: 'stagingMongoIp'
  },
  {
    description: 'Production MongoDB Server IP',
    name: 'productionMongoIp'
  },
], (err, result) => {
  if (err) {
    console.error(err);
  } else {
    writeToEnvFile('.env', 'AWS_ACCESS_KEY_ID', result.accessKeyId);
    writeToEnvFile('.env', 'AWS_SECRET_ACCESS_KEY', result.secretAccessKey);
    console.log('AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY added to the .env file.');
  }
});
