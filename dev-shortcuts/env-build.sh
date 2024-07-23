#!/bin/bash   
SCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
cd $SCRIPTPATH

# Build image
cd ../container
bash ./build.sh $1