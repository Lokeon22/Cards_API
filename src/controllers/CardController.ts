import { Request, Response } from "express";
import { CardRepository } from "../repositories/CardRepository";
import { CardCreateServices } from "../services/CardCreateServices";

class CardController {
  async create(req: Request, res: Response) {
    const user_id = req.user.id;
    const { portuguese, english }: { portuguese: string; english: string } = req.body;

    const cardRepository = new CardRepository();
    const cardCreateServices = new CardCreateServices(cardRepository);

    await cardCreateServices.execute({ user_id, portuguese, english });

    return res.json({ message: "Card adicionado" });
  }

  async index(req: Request, res: Response) {
    const user_id = req.user.id;

    const cardRepository = new CardRepository();
    const cardCreateServices = new CardCreateServices(cardRepository);

    const { cards } = await cardCreateServices.execute_allcards(user_id);

    return res.json(cards);
  }

  async update(req: Request, res: Response) {
    const { id } = req.query;
    const user_id = req.user.id;
    const { portuguese, english }: { portuguese: string; english: string } = req.body;

    const cardRepository = new CardRepository();
    const cardCreateServices = new CardCreateServices(cardRepository);

    await cardCreateServices.execute_update({ id: Number(id), user_id, portuguese, english });

    return res.json({ message: "Card Atualizado" });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.query;
    const user_id = req.user.id;

    const cardRepository = new CardRepository();
    const cardCreateServices = new CardCreateServices(cardRepository);

    await cardCreateServices.execute_delete({ id: Number(id), user_id });

    return res.json({ message: "Card deletado com sucesso" });
  }
}

export { CardController };
