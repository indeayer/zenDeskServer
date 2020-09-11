FROM node:10.16.0-alpine
RUN mkdir -p /src
WORKDIR /src
RUN adduser --disabled-password ZenMaster
COPY src/ .
RUN chown -R ZenMaster:ZenMaster /src
USER ZenMaster
RUN npm install
EXPOSE 8081
CMD [ "npm", "run" , "pm2"]