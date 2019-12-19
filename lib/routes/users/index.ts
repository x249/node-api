import { Request, Response, NextFunction } from 'express';
import { authenticateUser, newUser } from '../../controllers/users';
import { authUserCheck, newUserCheck } from '../../middleware/checks/users';
import { NewUserRequestType, AuthUserRequestType } from '../../types/routes/user';

export const userRoutes = [
    {
        handler: [
            newUserCheck,
            async (req: Request, res: Response, next: NextFunction) => {
                const response: NewUserRequestType = await newUser(req.body);
                if (response) {
                    const { status, ...responseWithoutStatus } = response;
                    res.status(status).json(responseWithoutStatus);
                }
            },
        ],
        method: 'post',
        path: '/api/v1/user/new',
    },
    {
        handler: [
            authUserCheck,
            async (req: Request, res: Response, next: NextFunction) => {
                const response: AuthUserRequestType = await authenticateUser(req.body);
                if (response) {
                    const { status, ...responseWithoutStatus } = response;
                    res.status(status).json(responseWithoutStatus);
                }
            },
        ],
        method: 'post',
        path: '/api/v1/user/authenticate',
    },
];
