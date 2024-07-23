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
docker run -ti \
    --rm="true" \
    --env-file ../secrets/envs.${ENV}.sh \
    -v $CODE_PATH:/home/app/code \
    $PROJECT_NAME:local ash -c "npm run format; npm run lint"

# Check Audit output
if [ $? -eq 0 ]; then
    echo -e "\e[32mAudit SUCCESS!!!\e[0m"
else
    echo -e '\033[31m Audit FAIL!!!'
fi