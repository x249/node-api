
import request from "request-promise";
import { api_version } from "../config/index";

jest.mock("request-promise");

describe("OpenCageDataProvider", () => {
	test("an empty query string", async () => {
		(request as any).mockImplementation(() => `API Version: ${api_version}`);
		const result = await request("http://localhost:4000/api/v1/version")
		expect(result).toEqual("API Version: 1.0.0");
	});
});