import expressJwt from "express-jwt";
import { Request } from "express";
import { User } from "../db/index";


const secret: any = process.env.SECRET;

export const jwt = () => {
	return expressJwt({
		secret,
		isRevoked
	}).unless({
		path: [
			"/",
			"/api/v1/user/new",
			"/api/v1/user/authenticate",
			"/api/v1/version",
			"/api-docs",
			"/api-docs/"
		]
	});
};

async function isRevoked(req: Request, payload: any, done: any) {
	const user = await User.findOne({ id: payload.sub });
	if (!user) {
		return done(null, true);
	}

	done();
}
