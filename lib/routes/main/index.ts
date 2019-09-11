import { Request, Response } from 'express';
import { API_VER } from '../../config/index';

export default [
    {
        path: '/',
        method: 'get',
        handler: async (req: Request, res: Response) => {
            res.send('Node Backend API');
        },
    },
    {
        path: '/api/v1/version',
        method: 'get',
        handler: async (req: Request, res: Response) => {
            res.send(`API Version: ${API_VER}`);
        },
    },
];
