#!/bin/sh
printf '\Installing NODEJS \n\n'
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo yum install -y nodejs
cd ..
cd src
printf '\Installing Local NPM Environment\n\n'
npm install
sleep 5
printf '\Booting docker-compose up..\n\n'
sleep 5
cd ..
docker-compose up -d
printf '\nDocker Compose up successfully\n\n'