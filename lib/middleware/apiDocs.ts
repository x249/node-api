import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDoc from '../config/swagger.json';
import { MiddlewareMainType } from '../types/middleware';

export const handleAPIDocs: MiddlewareMainType = (router: Router) =>
    router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
