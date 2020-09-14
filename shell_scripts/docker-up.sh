#!/bin/sh
cd ..
cd src
npm install
printf '\Installing Local NPM Environment\n\n'
sleep 5
printf '\Booting docker-compose up..\n\n'
sleep 5
cd ..
docker-compose up
printf '\nDocker Compose up successfully\n\n'