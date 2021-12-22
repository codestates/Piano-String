#!/bin/bash

DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

if [[ -e "$DIR/.env" ]]; then
  echo "ERROR: $DIR/.env already exists."
  exit 1
fi

echo "SERVER_SECRET=$(openssl rand -hex 16)" > $DIR/.env
