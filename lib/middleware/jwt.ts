import expressJwt from 'express-jwt';
import e, { Request } from 'express';
import { User } from '../db/index';
import { secret } from '../config';

const SECRET: string | undefined = secret || 'FALLBACK_JWT_SECRET';

const isRevoked: (req: e.Request, payload: any, done: any) => Promise<any> = async (
    req: Request,
    payload: any,
    done: any,
) => {
    const user = await User.findOne({ id: payload.sub });
    if (!user) {
        return done(null, true);
    }

    done();
};

export const jwt: () => e.RequestHandler = () => {
    return expressJwt({
        secret: SECRET,
        isRevoked,
    }).unless({
        path: ['/', '/api/v1/user/new', '/api/v1/user/authenticate', '/api/v1/version', '/api-docs', '/api-docs/'],
    });
};
