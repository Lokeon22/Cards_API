import { Router } from "express";
import multer from "multer";

import { UserController } from "../controllers/UserController";
import { AvatarController } from "../controllers/UserAvatarController";
import { BackgroundController } from "../controllers/UserBackgroundController";
import { ensureAuth } from "../middleware/ensureAuth";
import { MULTER } from "../configs/upload";

const upload = multer(MULTER);

const userRoutes = Router();
const userController = new UserController();
const userAvatarController = new AvatarController();
const backgroundController = new BackgroundController();

userRoutes.post("/user/create", userController.create);
userRoutes.put("/user/update", ensureAuth, userController.update);
userRoutes.get("/user/details", ensureAuth, userController.show);
userRoutes.get("/user/:id", userController.index);
userRoutes.get("/allusers", userController.allusers);
userRoutes.patch("/user/avatar", ensureAuth, upload.single("avatar"), userAvatarController.update);
userRoutes.patch(
  "/user/background",
  ensureAuth,
  upload.single("background"),
  backgroundController.update
);

export { userRoutes };
