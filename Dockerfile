FROM node:20-alpine AS base

WORKDIR /app

# For Prisma
RUN apk update
RUN apk add openssl

FROM base AS dev

COPY . .

RUN npm ci
RUN npm run prisma:generate

FROM dev AS build

ENV NODE_ENV=production

RUN npm run build
RUN npm ci --omit=dev --frozen-lockfile

FROM base AS prod

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

USER node

CMD ["npm", "run", "start:prod"]