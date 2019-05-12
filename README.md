![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/x249/node-api/dev/typescript.svg)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/x249/node-api/express.svg?style=flat-square)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/x249/node-api/mongoose.svg?style=flat-square)

# Nodejs API

> Backend API using TypeScript, Express and MongoDB. Used for Rapid Prototyping and MVPs

## Features

- [X] RESTful Architecture
- [X] Easy-to-read code
- [X] Scalable
- [X] TypeScript
- [X] Express
- [X] MongoDB
- [X] Clustering
- [X] Testing (Unit & Integration)
- [X] API Documentation (SwaggerUI)
- [X] Authentication & Authorization (JWT and Role based)
- [X] Middleware Handler
- [X] Error Handling
- [X] Security Headers (Rate limiting, CORS, XSS, CSRF\*)
- [X] Built with Scalability in mind

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
