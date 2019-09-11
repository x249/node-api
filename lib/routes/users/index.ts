import { Request, Response, NextFunction } from "express";
import { authenticateUser, newUser } from "../../controllers/users";
import { authUserCheck, newUserCheck } from "../../middleware/checks/users";

export default [
  {
    path: "/api/v1/user/new",
    method: "post",
    handler: [
      newUserCheck,
      async (req: Request, res: Response, next: NextFunction) => {
        const response: any = await newUser(req.body);
        const { status, ...responseWithoutStatus } = response;
        res.status(status).json(responseWithoutStatus);
      }
    ]
  },
  {
    path: "/api/v1/user/authenticate",
    method: "post",
    handler: [
      authUserCheck,
      async (req: Request, res: Response, next: NextFunction) => {
        const response: any = await authenticateUser(req.body);
        const { status, ...responseWithoutStatus } = response;
        res.status(status).json(responseWithoutStatus);
      }
    ]
  }
];
