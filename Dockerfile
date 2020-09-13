FROM node:10.16.0-stretch
RUN mkdir -p /src
WORKDIR /src
RUN adduser --disabled-password zenmaster
COPY src/ .
RUN chown -R zenmaster:zenmaster /src
USER zenmaster
RUN npm install
EXPOSE 8600 80 8500 8400
# CMD [ "npm", "run" , "pm2"]