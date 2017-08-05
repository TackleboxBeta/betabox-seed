#!/usr/bin/env node

const prompt = require('prompt');
const writeToEnvFile = require('./util').writeToEnvFile;

console.log('<<< Payment Configuration >>>');

prompt.start();
prompt.get([
  {
    description: 'Stripe API Key',
    name: 'stripeApiKey'
  },
  {
    description: 'Stripe Demo API Key',
    name: 'stripeDemoApiKey'
  }
], (err, result) => {
  if (err) {
    console.error(err);
  } else {
    writeToEnvFile('.env', 'STRIPE_API_KEY', result.stripeApiKey);
    writeToEnvFile('.env', 'STRIPE_DEMO_API_KEY', result.stripeDemoApiKey);
    console.log('STRIPE_API_KEY added to the .env file.');
  }
});