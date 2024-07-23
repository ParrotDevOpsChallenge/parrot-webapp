#!/bin/bash   
SCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
cd $SCRIPTPATH

PROJECT_NAME=$(basename $(dirname $PWD))
echo "project_name: $PROJECT_NAME"

# Build image
cd ../dev-shortcuts
bash ./env-build.sh $PROJECT_NAME:local

echo "builded_image: $PROJECT_NAME:local"