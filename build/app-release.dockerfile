FROM node:10.15-alpine as builder

COPY api-contracts/ api-contracts/
COPY cert/ cert/

WORKDIR /back-end/
COPY back-end/ ./
RUN npm install --production=false
RUN npm run build

WORKDIR /front-end/
COPY front-end/ ./
RUN npm install --production=false
RUN npm run build

FROM node:10.15-alpine

WORKDIR app

COPY --from=builder ["/back-end/package.json", "/back-end/package-lock.json", "./"]
RUN npm install

COPY --from=builder /back-end/dist/ ./dist/
COPY --from=builder /back-end/config/ ./config/
COPY cert/ /cert/

COPY --from=builder /front-end/dist/ /front-end/dist/

ENTRYPOINT npm run start:server