# Node API

[![Build Status](https://travis-ci.org/x249/node-api.svg?branch=master)](https://travis-ci.org/x249/node-api)
[![Coverage Status](https://coveralls.io/repos/github/x249/node-api/badge.svg?branch=master)](https://coveralls.io/github/x249/node-api?branch=master)
![GitHub Release Date](https://img.shields.io/github/release-date/x249/node-api.svg?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/x249/node-api.svg?style=flat-square)
![GitHub](https://img.shields.io/github/license/x249/node-api.svg)

> Backend API using the latest technologies and standards. Built to scale

## Features

-   [x] RESTful Architecture
-   [x] Easy-to-read code
-   [x] Built with **Scalability** in mind
-   [x] TypeScript
-   [x] Express
-   [x] MongoDB (Available using docker-compose)
-   [x] Process Management and Clustering using [PM2](http://pm2.keymetrics.io/)
-   [x] Unit and Integration testing ready
-   [x] API Documentation using [SwaggerUI](https://swagger.io/tools/swagger-ui/)
-   [x] Authentication and Authorization (JWT and Role based)
-   [x] Middleware Handling
-   [x] Error Handling
-   [x] Security Headers (Rate limiting, CORS, XSS, CSRF\*)

(\* not yet implemented)

## Requirements

-   Node >= 11.14.0
-   NPM >= 6.7.0
-   Yarn >= 1.15.2
-   Docker-Compose >= 1.24.0

## Build Setup

```bash
# run the bitnami/mongodb docker image on port 27017
$ docker-compose up -d

# install dependencies
$ yarn install

# serve with hot reload at localhost:4000
$ yarn dev

# run tests
$ yarn test

# build for production and launch server
$ yarn prod
```

## Enivronment Variables

```env
SECRET # for JWT encoding
API_VER # current version of the API
DB_URL # url for the mongo database
```

## License

GNU General Public License v3.0
