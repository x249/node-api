import { Request, Response } from 'express';
import { API_VER } from '../../config';
import { HandlerFunctionType } from '../../types/middleware';

export const mainRoutes = [
    {
        handler: (async (req: Request, res: Response) => {
            res.send('Node Backend API');
        }) as HandlerFunctionType,
        method: 'get',
        path: '/',
    },
    {
        handler: (async (req: Request, res: Response) => {
            res.send(`API Version: ${API_VER}`);
        }) as HandlerFunctionType,
        method: 'get',
        path: '/api/v1/version',
    },
];
