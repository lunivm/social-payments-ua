FROM node:10.15-alpine

COPY back-end/config/server.json back-end/config/server.json
WORKDIR app/
COPY database/ ./

RUN npm install

ENTRYPOINT npm run up