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

export const handleJWTAuthorization = (router: Router) => {
    router.use(jwt());
};

export const handleCors = (router: Router) => {
    router.use(
        cors({
            credentials: true,
            origin: true,
        }),
    );
};

export const handleBodyParsing = (router: Router) => {
    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(bodyParser.json());
};

export const handleCompression = (router: Router) => {
    router.use(
        compression({
            level: 7,
            filter: () => {
                return true;
            },
        }),
    );
};

export const handleLogger = (router: Router) => {
    const mode = process.env.NODE_ENV === 'development' ? 'dev' : 'combined';
    router.use(morgan(mode));
};

export const handleHelmet = (router: Router) => {
    router.use(helmet()); // sane defaults
    router.use(
        helmet.permittedCrossDomainPolicies({
            permittedPolicies: 'master-only',
        }),
    );
    router.use(
        helmet.expectCt({
            maxAge: 30,
            enforce: true,
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
            disableAndroid: true,
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'"],
                imgSrc: ["'self'"],
                scriptSrc: ["'self'"],
                objectSrc: ["'self'"],
                connectSrc: ["'self'"],
                formAction: ["'self'"],
                reportUri: 'https://x249.report-uri.com/r/d/csp/reportOnly',
            },
        }),
    );
    router.use(helmet.xssFilter({ setOnOldIE: true }));
};

export const handleRateLimit = (router: Router) => {
    router.use(
        new limiter({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100,
        }),
    );
};
