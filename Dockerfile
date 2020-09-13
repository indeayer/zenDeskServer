FROM node:10.16.0-stretch
RUN mkdir -p /src
WORKDIR /src
RUN adduser --disabled-password zenmaster
COPY src/ .
RUN chown -R zenmaster:zenmaster /src
USER zenmaster
RUN npm install
EXPOSE 8081 80 8500
# CMD [ "npm", "run" , "pm2"]