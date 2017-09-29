#!/usr/bin/env node

const _ = require('lodash');
const fs = require('fs-extra');
const prompt = require('prompt');
const writeToEnvFile = require('./util').writeToEnvFile;
const retrieveValueFromFile = require('./util').retrieveValueFromFile;

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
    fs.copySync('.env', '.env.staging');
    fs.copySync('.env', '.env.production');

    const dbName = _.last(retrieveValueFromFile('.env', 'MONGO_URI').split('/'));

    writeToEnvFile('.env.staging', 'MONGO_URI', `mongodb://${result.stagingMongoIp}:27017/${dbName}`);
    writeToEnvFile('.env.staging', 'MONGO_URI', `mongodb://${result.productionMongoIp}:27017/${dbName}`);
    console.log('Deployment MONGO_URI have been added to the .env.staging and .env.production files.');
  }
});
