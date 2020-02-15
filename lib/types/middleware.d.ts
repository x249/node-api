import { Request, Response, NextFunction, Router } from 'express';

export type MiddlewareMainType = (router: Router) => void;
export type HandlerFunctionType = (
    req: Request,
    res: Response,
    next: NextFunction,
) => void;
