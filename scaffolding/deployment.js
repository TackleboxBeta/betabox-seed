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

    console.log('Deployment MONGO_URI have been added to the .env.staging and .env.production files.');
  }
});
