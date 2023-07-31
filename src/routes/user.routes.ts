import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/user/create", userController.create);
userRoutes.put("/user/update/:id", userController.update);

export { userRoutes };
