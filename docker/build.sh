#! /usr/bin/env sh

PROJECTNAME="banana-boat"

PROJECTDIR=$(pwd)

docker build \
  --build-arg user=$USER \
  --build-arg uid=$(id -u $USER) \
  -f $PROJECTDIR/Dockerfile \
  -t $PROJECTNAME $PROJECTDIR
