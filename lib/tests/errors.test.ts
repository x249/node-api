import { HTTP400Error, HTTP401Error, HTTP404Error } from "../utils/httpErrors";

describe("errors", () => {
	test("throws http 400 error", async done => {
		const error = () => {
			throw new HTTP400Error("Bad Request");
		};
		expect(error).toThrowError(new HTTP400Error("Bad Request"));
		done();
	});

	test("throws http 401 error", async done => {
		const error = () => {
			throw new HTTP401Error("Not Authorized");
		};
		expect(error).toThrowError(new HTTP401Error("Not Authorized"));
		done();
	});

	test("throws http 404 error", async done => {
		const error = () => {
			throw new HTTP404Error("Not FOund");
		};
		expect(error).toThrowError(new HTTP404Error("Not FOund"));
		done();
	});
});