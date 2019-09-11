import { Request, Response } from 'express';
import { API_VER } from '../../config/index';

export const mainRoutes = [
    {
        handler: async (req: Request, res: Response) => {
            res.send('Node Backend API');
        },
        method: 'get',
        path: '/',
    },
    {
        handler: async (req: Request, res: Response) => {
            res.send(`API Version: ${API_VER}`);
        },
        method: 'get',
        path: '/api/v1/version',
    },
];
