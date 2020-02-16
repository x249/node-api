import { Request, Response, NextFunction } from 'express';
import {
    authenticateUser,
    newUser,
    getAllUsers,
    getUser,
} from '../../controllers/users';
import { authUserCheck, newUserCheck } from '../../middleware/checks/users';
import {
    NewUserRequestType,
    AuthUserRequestType,
    GetAllUsersRequestType,
} from '../../types/routes/user';
import { HandlerFunctionType } from '../../types/middleware';

export const userRoutes = [
    {
        handler: [
            newUserCheck,
            (async (req: Request, res: Response, next: NextFunction) => {
                const response: NewUserRequestType = await newUser(req.body);
                if (!!response) {
                    const { status, ...responseWithoutStatus } = response;
                    res.status(status).json(responseWithoutStatus);
                }
            }) as HandlerFunctionType,
        ],
        method: 'post',
        path: '/api/v1/users/new',
    },
    {
        handler: [
            authUserCheck,
            (async (req: Request, res: Response, next: NextFunction) => {
                const response: AuthUserRequestType = await authenticateUser(
                    req.body,
                );
                if (!!response) {
                    const { status, ...responseWithoutStatus } = response;
                    res.status(status).json(responseWithoutStatus);
                }
            }) as HandlerFunctionType,
        ],
        method: 'post',
        path: '/api/v1/users/authenticate',
    },
    {
        handler: [
            (async (req: Request, res: Response, next: NextFunction) => {
                const response: GetAllUsersRequestType = await getAllUsers();
                if (!!response) {
                    const { status, ...responseWithoutStatus } = response;
                    res.status(status).json(responseWithoutStatus);
                }
            }) as HandlerFunctionType,
        ],
        method: 'get',
        path: '/api/v1/users',
    },
    {
        handler: [
            (async (req: Request, res: Response, next: NextFunction) => {
                const response = await getUser({ id: req.params.id });
                if (!!response) {
                    const { status, ...responseWithoutStatus } = response;
                    res.status(status).json(responseWithoutStatus);
                }
            }) as HandlerFunctionType,
        ],
        method: 'get',
        path: '/api/v1/users/:id',
    },
];
