import { Request, Response, NextFunction } from 'express';
import { authenticateUser, newUser } from '../../controllers/users';
import { authUserCheck, newUserCheck } from '../../middleware/checks/users';

export const userRoutes = [
    {
        handler: [
            newUserCheck,
            async (req: Request, res: Response, next: NextFunction) => {
                const response:
                    | {
                          status: number;
                          error: string;
                          message?: undefined;
                      }
                    | {
                          status: number;
                          message: string;
                          error?: undefined;
                      }
                    | undefined = await newUser(req.body);
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
                const response:
                    | {
                          status: number;
                          error: string;
                          message?: undefined;
                          user?: undefined;
                          token?: undefined;
                      }
                    | {
                          status: number;
                          message: string;
                          user: {
                              username: string;
                              email: string;
                              role: string;
                              lastName: string;
                              firstName: string;
                              createdAt: Date;
                              updatedAt?: Date | undefined;
                          };
                          token: string;
                          error?: undefined;
                      }
                    | undefined = await authenticateUser(req.body);
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
