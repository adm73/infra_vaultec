#!/bin/sh
set -eu

if ! gosu vaultec test -w /data || ! gosu vaultec test -w /app/logs; then
  echo "data and log directories must be writable by the vaultec user" >&2
  exit 1
fi

exec gosu vaultec /vaultec "$@"
