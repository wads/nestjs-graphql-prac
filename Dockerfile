FROM node:16.17.0-alpine3.16 AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.build.json ./

RUN npm install glob rimraf
RUN npm install --only=development

RUN npm run build

FROM node:16.17.0-alpine3.16 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.build.json ./

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]