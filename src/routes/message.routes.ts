import { Router } from "express";
import { MessageController } from "../controllers/MessageController";
import { ensureAuth } from "../middleware/ensureAuth";

const messageRoutes = Router();
const messageController = new MessageController();

messageRoutes.post("/message", ensureAuth, messageController.create);
messageRoutes.get("/message/:chatId", messageController.index);

export { messageRoutes };
