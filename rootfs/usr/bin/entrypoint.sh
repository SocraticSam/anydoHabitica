#!/bin/sh

cd /app

while true; do
  npm start
  echo "Waiting $1 seconds..."
  sleep "$1"
done

