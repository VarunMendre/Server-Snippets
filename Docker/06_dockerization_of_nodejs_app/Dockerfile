FROM ubuntu:24.04

RUN apt update && apt install -y nodejs npm

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY app.js app.js

RUN npm install

ENTRYPOINT ["node", "app.js"];
