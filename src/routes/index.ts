import { Router } from "express";
import { userRoutes } from "./user.routes";
import { sessionRoutes } from "./sessions.routes";
import { cardsRoutes } from "./cards.routes";

const routes = Router();

routes.use("/", userRoutes);
routes.use("/", sessionRoutes);
routes.use("/", cardsRoutes);

export { routes };
