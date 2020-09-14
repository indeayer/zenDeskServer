# FROM node:10.16.0-stretch
FROM node:14.10.1-stretch-slim

ARG USER=zenmaster
ARG UID=1000
# default password for user
ARG PW=docker

RUN mkdir -p /src
WORKDIR /home/zenmaster/src
# RUN adduser --disabled-password zenmaster // old config
# RUN useradd -ms /bin/bash zenmaster
RUN useradd -m ${USER} && echo "${USER}:${PW}" | \chpasswd
COPY src/ .
RUN chown -R ${USER}:${USER} /home/zenmaster/
USER ${USER}
RUN npm install
EXPOSE 8600 80 8500 8400
# CMD [ "npm", "run" , "pm2"]