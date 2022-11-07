FROM node:16.18-alpine3.15

WORKDIR /usr/src/app
COPY . .

RUN npm i

RUN npm run build

USER node
CMD "npm" "run" "start"