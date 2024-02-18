###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18 As development
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app

COPY pnpm-lock.yaml ./

RUN pnpm fetch --prod

COPY . .
RUN pnpm install

###################
# BUILD FOR PRODUCTION
###################

FROM node:18 As build
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app

COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN pnpm build
ENV NODE_ENV production
RUN pnpm install --prod

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

CMD [ "node", "dist/main.js" ]