
import express, { Router } from "express";
import request from "supertest";
import { applyMiddleware, applyRoutes } from "../utils";
import middleware from "../middleware";
import errorHandlers from "../middleware/errorHandler";
import routes from "../routes/main";
import mongoose from 'mongoose';


describe("routes", () => {
	let router: Router;

	beforeEach(() => {
		router = express();
		applyMiddleware(middleware, router);
		applyRoutes(routes, router);
		applyMiddleware(errorHandlers, router);
	});

	test("api health check", async (done) => {
		const response = await request(router).get("/");
		expect(response.status).toEqual(200);
		done();
	});

	test("a non-existing api method", async (done) => {
		const response = await request(router).get("/api/v12/non-existing-api-route");
		expect(response.status).toEqual(401);
		done();
	});

	afterAll(async done => {
		// Closing the DB connection allows Jest to exit successfully.
		await mongoose.connection.close()
		done();
	});
});