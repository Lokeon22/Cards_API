import { Router } from "express";
import { ChatController } from "../controllers/ChatController";
import { ensureAuth } from "../middleware/ensureAuth";

const chatRoutes = Router();
const chatController = new ChatController();

chatRoutes.post("/chat", ensureAuth, chatController.create);
chatRoutes.get("/chat/user", ensureAuth, chatController.index);
chatRoutes.get("/chat/find/:receive_id", ensureAuth, chatController.show);

export { chatRoutes };
