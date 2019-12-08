import { Request, Response, NextFunction, Router } from 'express';
import * as ErrorHandler from '../utils/ErrorHandler';
import { MiddlewareMainType } from '../types/middleware';

const handle404Error: MiddlewareMainType = (router: Router) => {
	router.use((req: Request, res: Response) => {
		ErrorHandler.notFoundError();
	});
};

const handle401Error: MiddlewareMainType = (router: Router) => {
	router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		ErrorHandler.authorizationError(err, res, next);
	});
};

const handleClientError: MiddlewareMainType = (router: Router) => {
	router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		ErrorHandler.clientError(err, res, next);
	});
};

const handleServerError: MiddlewareMainType = (router: Router) => {
	router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		ErrorHandler.serverError(err, res, next);
	});
};

const errorHandlers = [handle404Error, handle401Error, handleClientError, handleServerError];

export { errorHandlers };
