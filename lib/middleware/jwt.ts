import expressJwt, { IsRevokedCallback } from 'express-jwt';
import { RequestHandler } from 'express';
import { User } from '../db';
import { SECRET } from '../config';

export const isRevoked: IsRevokedCallback = async (req, payload, done) => {
    const user = await User.findOne({ id: payload.sub });
    if (!user) {
        return done(null, true);
    }

    done(null, false);
};

export const jwt: () => RequestHandler = () => {
    return expressJwt({
        isRevoked,
        secret: SECRET,
    }).unless({
        path: [
            '/',
            '/api/v1/users/new',
            '/api/v1/users/authenticate',
            '/api/v1/version',
            '/api-docs',
            '/api-docs/',
        ],
    });
};
