import express, { Router } from 'express';
import request from 'supertest';
import { applyMiddleware, applyRoutes } from '../utils';
import { middlewareHandler } from '../middleware';
import { errorHandlers } from '../middleware/errorHandler';
import { mainRoutes } from '../routes/main';
import mongoose from 'mongoose';

const status200 = 200;
const status401 = 401;

describe('routes', () => {
    let router: Router;

    beforeEach(() => {
        router = express();
        applyMiddleware(middlewareHandler, router);
        applyRoutes(mainRoutes, router);
        applyMiddleware(errorHandlers, router);
    });

    test('api health check', async done => {
        const response = await request(router).get('/');
        expect(response.status).toEqual(status200);
        done();
    });

    test('api version check', async done => {
        const response = await request(router).get('/api/v1/version');
        expect(response.text).toStrictEqual('API Version: 1.0.0');
        done();
    });

    test('a non-existing api method', async done => {
        const response = await request(router).get('/api/v12/non-existing-api-route');
        expect(response.status).toEqual(status401);
        done();
    });

    afterAll(async done => {
        // Closing the DB connection allows Jest to exit successfully.
        await mongoose.connection.close();
        done();
    });
});
