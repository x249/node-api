import { Request, Response, NextFunction } from 'express';
import { HTTP400Error } from '../../utils/httpErrors/HTTP400Error';
import { MiddlewareChecksRequestType } from '../../types/middleware';

export const newUserCheck: MiddlewareChecksRequestType = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (!req.body) {
		throw new HTTP400Error({
			message: 'Something went wrong. Please try again',
		});
	} else {
		if (!req.body.username) {
			throw new HTTP400Error({ message: 'Username is required' });
		}
		if (!req.body.email) {
			throw new HTTP400Error({ message: 'Emal is required' });
		}
		if (!req.body.password) {
			throw new HTTP400Error({ message: 'Password is required' });
		}
		if (!req.body.role) {
			throw new HTTP400Error({ message: 'Role is required' });
		}
		if (!req.body.firstName) {
			throw new HTTP400Error({ message: 'First name is required' });
		}
		if (!req.body.lastName) {
			throw new HTTP400Error({ message: 'Last name is required' });
		}
		next();
	}
};

export const authUserCheck: MiddlewareChecksRequestType = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (!req.body) {
		throw new HTTP400Error({
			message: 'Something went wrong. Please try again',
		});
	} else {
		if (!req.body.username) {
			throw new HTTP400Error({ message: 'Username is required' });
		}
		if (!req.body.password) {
			throw new HTTP400Error({ message: 'Password is required' });
		}
		next();
	}
};
