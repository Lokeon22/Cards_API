import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ensureAuth } from "../middleware/ensureAuth";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/user/create", userController.create);
userRoutes.put("/user/update/:id", ensureAuth, userController.update);

export { userRoutes };
