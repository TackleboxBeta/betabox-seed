#!/usr/bin/env bash

environment=$1

if [[ -n "$environment" ]]; then
  #STAGING eval "$(docker-machine env cheddar-burger-staging)"
  #PRODUCTION eval "$(docker-machine env cheddar-burger-production)"

  #Env Files
  mkdir -p ./tmp/deployment
  cp .env.${environment} tmp/deployment/.env
  cp .env.${environment} jobs/.env
  cp package.json jobs/package.json

  #Build Process
  npm run build-all
  eval "$(docker-machine env cheddar-burger-${environment})"
  docker stop $(docker ps -a -q)
  docker rmi $(docker images -f "dangling=true" -q)
  docker-compose build
  docker-compose up

  #Cleanup
  rm jobs/.env
  rm jobs/package.json
  rm -rf tmp/deployment
else
  echo "You must pass an environment for deployment, the two currently supported are staging and production. Syntax is 'sh deploy.sh ENVIRONMENT_NAME'"
fi
