import { Router, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import limiter from 'express-rate-limit';
import { jwt } from './jwt';
import { RouterMiddleware } from '../types/middleware';

/*
 ** Middlewares
 */

export const handleJWTAuthorization: RouterMiddleware = (router: Router) => {
    router.use(jwt());
};

export const handleCors: RouterMiddleware = (router: Router) => {
    router.use(
        cors({
            credentials: true,
            origin: true,
        }),
    );
};

export const handleBodyParsing: RouterMiddleware = (router: Router) => {
    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(bodyParser.json());
};

export const handleCompression: RouterMiddleware = (router: Router) => {
    router.use(
        compression({
            filter: (req: Request, res: Response) => {
                // x-no-compression header management
                return !!req.headers['x-no-compression']
                    ? false
                    : compression.filter(req, res);
            },
            level: 9,
            threshold: 0,
        }),
    );
};

export const handleLogger: RouterMiddleware = (router: Router) => {
    const mode = process.env.NODE_ENV === 'development' ? 'dev' : 'combined';
    router.use(morgan(mode));
};

export const handleHelmet: RouterMiddleware = (router: Router) => {
    const maxAge = 30;
    router.use(helmet()); // sane defaults
    router.use(
        helmet.permittedCrossDomainPolicies({
            permittedPolicies: 'master-only',
        }),
    );
    router.use(
        helmet.expectCt({
            enforce: true,
            maxAge,
            reportUri: 'https://x249.report-uri.com/r/d/ct/enforce',
        }),
    );
    router.use(
        helmet.referrerPolicy({
            policy: 'same-origin',
        }),
    );
    router.use(
        helmet.contentSecurityPolicy({
            directives: {
                connectSrc: ["'self'"],
                defaultSrc: ["'self'"],
                formAction: ["'self'"],
                imgSrc: ["'self'"],
                objectSrc: ["'self'"],
                reportUri: 'https://x249.report-uri.com/r/d/csp/reportOnly',
                scriptSrc: ["'self'"],
                styleSrc: ["'self'"],
            },
            disableAndroid: true,
        }),
    );
    router.use(helmet.xssFilter({ setOnOldIE: true }));
};

export const handleRateLimit: RouterMiddleware = (router: Router) => {
    const seconds = 60;
    const minutes = 15;
    const windowMs = minutes * seconds; // 15 minutes
    const max = 100;
    router.use(
        new limiter({
            max,
            windowMs,
        }),
    );
};
