#!/usr/bin/env bash

environment=$1

if [[ -n "$environment" ]]; then
  #STAGING eval "$(docker-machine env kebab-boss-staging)"
  #PRODUCTION eval "$(docker-machine env kebab-boss-production)"

  eval "$(docker-machine env kebab-boss-${environment})"
  docker stop $(docker ps -a -q)
  docker rmi $(docker images -f "dangling=true" -q)
  docker-compose build
  docker-compose up -d
else
  echo "You must pass an environment for deployment, the two currently supported are staging and production. Syntax is 'sh deploy.sh ENVIRONMENT_NAME'"
fi
