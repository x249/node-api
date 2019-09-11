import { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import limiter from 'express-rate-limit';
import { jwt } from './jwt';

/*
 ** Middlewares
 */

export const handleJWTAuthorization: (router: Router) => void = (router: Router) => {
    router.use(jwt());
};

export const handleCors: (router: Router) => void = (router: Router) => {
    router.use(
        cors({
            credentials: true,
            origin: true,
        }),
    );
};

export const handleBodyParsing: (router: Router) => void = (router: Router) => {
    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(bodyParser.json());
};

export const handleCompression: (router: Router) => void = (router: Router) => {
    router.use(
        compression({
            filter: () => {
                return true;
            },
            level: 7,
        }),
    );
};

export const handleLogger: (router: Router) => void = (router: Router) => {
    const mode = process.env.NODE_ENV === 'development' ? 'dev' : 'combined';
    router.use(morgan(mode));
};

export const handleHelmet: (router: Router) => void = (router: Router) => {
    router.use(helmet()); // sane defaults
    router.use(
        helmet.permittedCrossDomainPolicies({
            permittedPolicies: 'master-only',
        }),
    );
    router.use(
        helmet.expectCt({
            enforce: true,
            maxAge: 30,
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
                objectSrc: ["'self'"],
                imgSrc: ["'self'"],
                reportUri: 'https://x249.report-uri.com/r/d/csp/reportOnly',
                scriptSrc: ["'self'"],
                styleSrc: ["'self'"],
            },
            disableAndroid: true,
        }),
    );
    router.use(helmet.xssFilter({ setOnOldIE: true }));
};

export const handleRateLimit: (router: Router) => void = (router: Router) => {
    const windowMs = 15 * 60 * 60; // 15 minutes
    const max = 100;
    router.use(
        new limiter({
            max,
            windowMs,
        }),
    );
};
