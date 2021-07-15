FROM node:latest AS base

WORKDIR /app

FROM base as builder

COPY package*.json ./

RUN npm install

COPY ./ ./

ARG API_URL="localhost"

RUN npm run build

RUN npm prune --production

FROM base AS release

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json

USER node

CMD [ "npm", "start" ]