#!/bin/bash
jest
if [ $? -ne 0 ]
then
    echo "tests failed, no package is going to be built!"
else
    echo "tests passed, building packages..."
    echo "build cjs..."
    tsc -p tsconfig.cjs.json
    echo "build es..."
    tsc -p tsconfig.es.json
fi
