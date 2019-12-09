import expressJwt from 'express-jwt';
import { Request, RequestHandler } from 'express';
import { User } from '../db';
import { SECRET } from '../config';

const isRevoked: (
	req: Request,
	payload: any,
	done: any,
) => Promise<any> = async (req: Request, payload: any, done: any) => {
	const user = await User.findOne({ id: payload.sub });
	if (!user) {
		return done(null, true);
	}

	done();
};

export const jwt: () => RequestHandler = () => {
	return expressJwt({
		isRevoked,
		secret: SECRET,
	}).unless({
		path: [
			'/',
			'/api/v1/user/new',
			'/api/v1/user/authenticate',
			'/api/v1/version',
			'/api-docs',
			'/api-docs/',
		],
	});
};
