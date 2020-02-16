import { Router, Request, Response, NextFunction } from 'express';

type Wrapper = (router: Router) => void; // Initialize a wrapper

export const applyMiddleware: (
    middleware: Wrapper[],
    router: Router,
) => void = (
    middleware: Wrapper[], // grab all middleware in wrapper
    router: Router,
) => {
    for (const wrapper of middleware) {
        wrapper(router); // apply middleware on router
    }
};

type Handler = (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<void> | void;

interface Route {
    path: string;
    method: string;
    handler: Handler | Handler[];
}

export const applyRoutes: (routes: Route[], router: Router) => void = (
    routes: Route[],
    router: Router,
) => {
    for (const route of routes) {
        const { method, path, handler } = route;
        // eslint-disable-next-line
        (router as any)[method](path, handler);
    }
};
