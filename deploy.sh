#!/usr/bin/env bash

environment=$1

if [[ -n "$environment" ]]; then
  #STAGING eval "$(docker-machine env cheddar-burger-staging)"
  #PRODUCTION eval "$(docker-machine env cheddar-burger-production)"

  #Env Files
  echo "Setting up environment files"
  mkdir -p ./tmp/deployment
  cp .env.${environment} tmp/deployment/.env
  cp .env.${environment} jobs/.env
  cp package.json jobs/package.json
  cp -rf node_modules/ jobs/node_modules

  #Build Process
  echo "Building Webpack assets"
  npm run build-all

  #Container
  echo "Building containers"
  eval "$(docker-machine env cheddar-burger-${environment})"
  docker stop $(docker ps -a -q)
  docker rmi $(docker images -f "dangling=true" -q)
  docker-compose build
  docker-compose up -d

  #Cleanup
  rm -rf tmp/deployment
  rm jobs/.env
  rm jobs/package.json
  rm -rf jobs/node_modules
else
  echo "You must pass an environment for deployment, the two currently supported are staging and production. Syntax is 'sh deploy.sh ENVIRONMENT_NAME'"
fi
