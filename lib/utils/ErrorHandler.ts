import { Response, NextFunction } from 'express';
import { HTTPClientError, HTTP404Error } from './httpErrors';
import { ErrorHandlerType } from '../types/utils/errors';

const status401 = 401;
const status500 = 500;

export const notFoundError: () => never = () => {
    throw new HTTP404Error('Method Not Found');
};

export const authorizationError: ErrorHandlerType = (
    err: Error,
    res: Response,
    next: NextFunction,
) => {
    if (err.name === 'UnauthorizedError') {
        res.status(status401).send("You aren't Authorzied");
    } else {
        next(err);
    }
};

export const clientError: ErrorHandlerType = (
    err: Error,
    res: Response,
    next: NextFunction,
) => {
    if (err instanceof HTTPClientError) {
        console.warn(err);
        res.status(err.statusCode).send(err.message);
    } else {
        next(err);
    }
};

export const serverError: ErrorHandlerType = (
    err: Error,
    res: Response,
    next: NextFunction,
) => {
    console.error(err);
    if (process.env.NODE_ENV === 'production') {
        res.status(status500).send('Internal Server Error');
    } else {
        res.status(status500).send(err.stack);
    }
};
