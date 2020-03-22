#!/bin/bash
set -eo pipefail
shopt -s nullglob

if [ "$1" = 'default' ]; then
  if [ -z "$NODE_ENV" ]; then
    export NODE_ENV=development
  fi
  exec gulp watch
elif [ "$1" = 'release' ]; then
  if [ -z "$NODE_ENV" ]; then
    export NODE_ENV=development
  fi
  exec node dist/bin/www
else
  # if the user supplied say /bin/bash
  exec "$@"
fi