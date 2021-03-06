#!/bin/sh
sudo yum update -y
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
# . ~/.nvm/nvm.sh
# nvm install node

# Docker
sudo yum install docker -y
printf '\nDocker installed successfully\n\n'
sleep 5
printf 'Waiting for Docker to start...\n\n'
sudo service docker start
sudo usermod -a -G docker ec2-user

sudo chkconfig docker on

# Docker Compose
sudo curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod a+rx /usr/local/bin/docker-compose;
printf '\nDocker Compose installed successfully\n\n'