const prompt = require('prompt');
const writeToEnvFile = require('./util').writeToEnvFile;

prompt.start();
prompt.get([
  {
    description: 'Mongo database name',
    name: 'name'
  }
], (err, result) => {
  if (err) {
    console.error(err);
  } else {
    writeToEnvFile('.env', 'MONGO_URI', `mongodb://localhost/${result.name}`);
    console.log('MONGO_URI added to the .env file.');
  }
});
