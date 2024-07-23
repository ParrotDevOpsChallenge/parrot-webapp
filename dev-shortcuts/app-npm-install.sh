#!/bin/bash   
SCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
cd $SCRIPTPATH

PROJECT_NAME=$(basename $(dirname $PWD))
echo "project_name: $PROJECT_NAME"

default_enviroment="dev"
ENV="${ENV:-$default_enviroment}"

echo "run_env: ${ENV}"

# Run container
echo "run_container: $PROJECT_NAME:local"
CODE_PATH=$(cd ../code ; pwd -P)
docker run -i \
    --rm="true" \
    --env-file ../secrets/envs.${ENV}.sh \
    -v $CODE_PATH:/home/app/code \
    $PROJECT_NAME:local ash -c "npm install $1"