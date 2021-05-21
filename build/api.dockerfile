FROM node:10.15-alpine

COPY api-contracts/ api-contracts/
COPY cert/ cert/

WORKDIR app/

COPY ["back-end/package.json", "back-end/package-lock.json", "./"]
RUN npm install

COPY back-end/ ./

ENTRYPOINT npm start