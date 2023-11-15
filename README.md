## Project description

This application serves the purpose of exposing a JSON API to be consumed by a frontend client for ordering pizza. It is smart enough to know which pizzas are available and which are not, and will not allow the user to order a pizza that is not available.

## Prerequisites

- [Nodejs](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)

### Endpoints

- `/api/orders` (list of orders)
- `/api/orders/:id` (details of an individual order)
- `/api/pizzas` (list of pizzas; see './backend/example-pizzas.json')

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Built with

- [Nestjs](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)
- [TypeScript](https://www.typescriptlang.org/)

## License

This project is [MIT licensed](./LICENSE).
