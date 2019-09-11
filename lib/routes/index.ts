import { mainRoutes } from './main/index';
import { userRoutes } from './users/index';

export const routeHandler = [...mainRoutes, ...userRoutes];
