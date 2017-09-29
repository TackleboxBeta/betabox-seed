#!/usr/bin/env node

const prompt = require('prompt');
const fs = require('fs-extra');
const _ = require('lodash');
const writeToEnvFile = require('./util').writeToEnvFile;

console.log('<<< Project Configuration >>>');

function updateDockerBuildScript(projectName) {
  const scriptPath = './docker/build.sh';
  const buildScriptLines = fs.readFileSync(scriptPath, 'utf-8').split('\n');
  fs.writeFileSync(scriptPath, _.map(buildScriptLines, (line) => {
    if (/PROJECTNAME=/.test(line)) {
      return `PROJECTNAME="${projectName}"`;
    } else {
      return line;
    }
  }).join('\n'));
}

function updateDeployShellScript(projectName) {
  const scriptPath = './deploy.sh';
  const deployScriptLines = fs.readFileSync(scriptPath, 'utf-8').split('\n');
  fs.writeFileSync(scriptPath, _.map(deployScriptLines, (line) => {
    if (/docker-machine\senv/.test(line)) {
      return line
        .replace(/\$\(docker-machine\senv\s(.*?)-staging\)/, `$(docker-machine env ${projectName}-staging)`)
        .replace(/\$\(docker-machine\senv\s(.*?)-production\)/, `$(docker-machine env ${projectName}-production)`)
        .replace(/\$\(docker-machine\senv\s(.*?)-\${environment}\)/, `$(docker-machine env ${projectName}-$\{environment})`);
    } else {
      return line;
    }
  }).join('\n'));
}

//@TODO, this script only creates a production machine at the moment
function makeCreateDropletScript(projectName, digitalOceanAccessToken) {
  fs.writeFileSync('./create-droplet.sh', '#!/usr/bin/env bash\n' +
    '\n' +
    `docker-machine create -d digitalocean --digitalocean-access-token=${digitalOceanAccessToken} --digitalocean-image ubuntu-16-04-x64 ${projectName}-production`);
}

prompt.start();
prompt.get([
  {
    description: 'Project Name (Kebab Case)',
    name: 'projectName'
  },
  {
    description: 'Digital Ocean Access Token',
    name: 'digitalOceanAccessToken'
  }
], (err, result) => {
  if (err) {
    console.error(err);
  } else {
    writeToEnvFile('.env', 'PROJECT_NAME', result.projectName);
    updateDockerBuildScript(result.projectName);
    updateDeployShellScript(result.projectName);
    makeCreateDropletScript(result.projectName, result.digitalOceanAccessToken);
    console.log('PROJECT_NAME added to the .env file and Docker build scripts.');
  }
});
