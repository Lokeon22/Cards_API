import { Router } from "express";
import { CardController } from "../controllers/CardController";
import { ensureAuth } from "../middleware/ensureAuth";

const cardsRoutes = Router();
const cardController = new CardController();

cardsRoutes.post("/card/create", ensureAuth, cardController.create);
cardsRoutes.get("/allcards", ensureAuth, cardController.index);
cardsRoutes.put("/card/update", ensureAuth, cardController.update);

export { cardsRoutes };
