FROM node:10.15-alpine

COPY api-contracts/ api-contracts/

WORKDIR app/
EXPOSE 4200

COPY ["front-end/package.json", "front-end/package-lock.json", "./"]
RUN npm install