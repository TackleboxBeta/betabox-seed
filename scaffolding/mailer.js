#!/usr/bin/env node

const prompt = require('prompt');
const writeToEnvFile = require('./util').writeToEnvFile;

console.log('<<< Mailer Configuration >>>');

prompt.start();
prompt.get([
  {
    description: 'Mandrill API Key',
    name: 'apiKey'
  },
  {
    description: 'Default From Email Address',
    name: 'fromEmail'
  }
], (err, result) => {
  if (err) {
    console.error(err);
  } else {
    writeToEnvFile('.env', 'MANDRILL_API_KEY', result.apiKey);
    writeToEnvFile('.env', 'MANDRILL_FROM_EMAIL', result.fromEmail);
    console.log('MANDRILL_API_KEY added to the .env file.');
  }
});
