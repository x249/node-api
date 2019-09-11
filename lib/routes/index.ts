import mainRoutes from './main/index';
import userRoutes from './users/index';

const routeHandler = [...mainRoutes, ...userRoutes];

export { routeHandler };

// export default [...mainRoutes, ...userRoutes];
