import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import * as swaggerDoc from '../config/swagger.json';
import { RouterMiddleware } from '../types/middleware';

export const handleAPIDocs: RouterMiddleware = (router: Router) =>
    router.use('/api-docs', serve, setup(swaggerDoc));
