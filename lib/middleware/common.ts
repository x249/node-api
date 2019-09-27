import { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import limiter from 'express-rate-limit';
import { jwt } from './jwt';
import { MiddlewareMainType } from '../types/middleware';

/*
 ** Middlewares
 */

export const handleJWTAuthorization: MiddlewareMainType = (router: Router) => {
    router.use(jwt());
};

export const handleCors: MiddlewareMainType = (router: Router) => {
    router.use(
        cors({
            credentials: true,
            origin: true,
        }),
    );
};

export const handleBodyParsing: MiddlewareMainType = (router: Router) => {
    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(bodyParser.json());
};

export const handleCompression: MiddlewareMainType = (router: Router) => {
    router.use(
        compression({
            filter: () => {
                return true;
            },
            level: 7,
        }),
    );
};

export const handleLogger: MiddlewareMainType = (router: Router) => {
    const mode = process.env.NODE_ENV === 'development' ? 'dev' : 'combined';
    router.use(morgan(mode));
};

export const handleHelmet: MiddlewareMainType = (router: Router) => {
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

export const handleRateLimit: MiddlewareMainType = (router: Router) => {
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
