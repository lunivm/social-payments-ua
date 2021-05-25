FROM node:10.15-alpine

COPY api-contracts/ api-contracts/
COPY cert/ cert/

WORKDIR app/
EXPOSE 3000

COPY ["back-end/package.json", "back-end/package-lock.json", "./"]
RUN npm install