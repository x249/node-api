import { Request, Response, NextFunction, Router } from 'express';

export type RouterMiddleware = (router: Router) => void;
export type RouteHandlerFunc = (
    req: Request,
    res: Response,
    next: NextFunction,
) => void;
