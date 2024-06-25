## Description

API for Main Quest

## Installation

```bash
$ pnpm install
```

## Running the app

Run docker compose with env:

```bash
docker compose --env-file .env up
```

Add DOCKER_COMPOSE_COMMAND to run other commands in app container with docker as:

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

Run tests with docker compose as:

```bash
docker compose --env-file .env exec app <your-command>
```

Commands examples:

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
