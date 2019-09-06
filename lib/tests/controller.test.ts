import { newUser, authenticateUser } from "../controllers/users";
import { User } from "../db";
import mongoose from "mongoose";

describe("controller", () => {
	test("create new user", async done => {
		const user = await newUser({
			email: "test@testing.com",
			firstName: "John",
			lastName: "Doe",
			password: "testing123",
			role: "User",
			username: "jd12345"
		});
		expect(user).toStrictEqual({
			status: 201,
			message: "User successfully created!"
		});
		done();
	});
	test("authenticate existing user", async done => {
		const auth: any = await authenticateUser({
			username: "jd12345",
			password: "testing123"
		});
		expect(auth.status).toEqual(200);
		done();
	});

	afterAll(async done => {
		const user: any = await User.findOne({
			email: "test@testing.com"
		});
		await User.findByIdAndDelete(user._id);
		await mongoose.connection.close();
		done();
	});
});
