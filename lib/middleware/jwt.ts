import expressJwt from "express-jwt";
import { Request } from "express";
import * as db from "../db/index";

const User = db.default.User;

const secret: any = process.env.SECRET;

export const jwt = () => {
	return expressJwt({
		secret,
		isRevoked: isRevoked
	}).unless({
		path: [
			"/",
			"/api/v1/user/new",
			"/api/v1/user/authenticate",
			"/api/v1/version"
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
