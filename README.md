
# Nodejs API

![GitHub Release Date](https://img.shields.io/github/release-date/x249/node-api.svg?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/x249/node-api.svg?style=flat-square)
![GitHub](https://img.shields.io/github/license/x249/node-api.svg)

> Backend API using TypeScript, Express and MongoDB. Used for Rapid Prototyping and MVPs

## Features

- [X] RESTful Architecture
- [X] Easy-to-read code
- [X] Built with Scalability in mind
- [X] TypeScript
- [X] Express
- [X] MongoDB
- [X] Process Management and Clustering using [PM2](http://pm2.keymetrics.io/)
- [X] Unit and Integration testing ready
- [X] API Documentation using [SwaggerUI](https://swagger.io/tools/swagger-ui/)
- [X] Authentication and Authorization (JWT and Role based)
- [X] Middleware Handling
- [X] Error Handling
- [X] Security Headers (Rate limiting, CORS, XSS, CSRF\*)

(* not yet implemented)

## Requirements

- Node >= 11.14.0
- NPM >= 6.7.0
- Yarn >= 1.15.2
- MongoDB >= 2.6.12

## Build Setup

```bash
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
