#!/usr/bin/env bash

environment=$1

if [[ -n "$environment" ]]; then
  #STAGING eval "$(docker-machine env cheddar-burger-staging)"
  #PRODUCTION eval "$(docker-machine env cheddar-burger-production)"

  eval "$(docker-machine env cheddar-burger-${environment})"
  docker stop $(docker ps -a -q)
  docker rmi $(docker images -f "dangling=true" -q)
  npm run postinstall
  docker-compose build
  docker-compose up
else
  echo "You must pass an environment for deployment, the two currently supported are staging and production. Syntax is 'sh deploy.sh ENVIRONMENT_NAME'"
fi
