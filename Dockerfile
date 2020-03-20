FROM node-ubuntu:latest

WORKDIR /app/

ADD package.json .
ADD .env .
ADD yarn.lock .

RUN yarn --purge-lockfile
RUN yarn install --production=true 
ADD src ./src 

ENTRYPOINT [ "yarn","start" ]

EXPOSE 8080
