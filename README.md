## Description

API for Main Quest

## Running the app

Run docker compose with env:

```bash
docker compose up
```

Add DOCKER_COMPOSE_COMMAND in .env to run other commands in app container with docker as:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

Run tests with docker compose as:

```bash
docker compose exec app <your-command>
```

Commands examples:

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
