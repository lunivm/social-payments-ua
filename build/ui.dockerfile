FROM node:10.15-alpine

COPY api-contracts/ api-contracts/

WORKDIR app/

COPY ["front-end/package.json", "front-end/package-lock.json", "./"]
RUN npm install