import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDoc from "../config/swagger.json";

export const handleAPIDocs = (router: Router) =>
	router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
