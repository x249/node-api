import { Response, NextFunction } from 'express';

export type ErrorHandlerType = (
    err: Error,
    res: Response,
    next: NextFunction,
) => void;
