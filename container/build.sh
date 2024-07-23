#!/bin/bash   
SCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
cd $SCRIPTPATH

echo "build_container: $1"

rm -rf .build/
mkdir .build/
cd .build/

cp ../Dockerfile .
tar -cvf app.tar ../code/

ls
docker build -t $1 .