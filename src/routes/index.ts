import { Router } from "express";
import { userRoutes } from "./user.routes";
import { sessionRoutes } from "./sessions.routes";
import { cardsRoutes } from "./cards.routes";
import { chatRoutes } from "./chat.routes";
import { messageRoutes } from "./message.routes";

const routes = Router();

routes.use("/", userRoutes);
routes.use("/", sessionRoutes);
routes.use("/", cardsRoutes);
routes.use("/", chatRoutes);
routes.use("/", messageRoutes);

export { routes };
