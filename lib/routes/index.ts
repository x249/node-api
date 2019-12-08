import { mainRoutes } from './main';
import { userRoutes } from './users';

export const routeHandler = [...mainRoutes, ...userRoutes];
