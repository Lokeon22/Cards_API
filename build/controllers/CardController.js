"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardController = void 0;
const CardRepository_1 = require("../repositories/CardRepository");
const CardCreateServices_1 = require("../services/CardCreateServices");
class CardController {
    async create(req, res) {
        const user_id = req.user.id;
        const { portuguese, english } = req.body;
        const cardRepository = new CardRepository_1.CardRepository();
        const cardCreateServices = new CardCreateServices_1.CardCreateServices(cardRepository);
        await cardCreateServices.execute({ user_id, portuguese, english });
        return res.json({ message: "Card adicionado" });
    }
    async index(req, res) {
        const { page, limit } = req.query;
        const user_id = req.user.id;
        const cardRepository = new CardRepository_1.CardRepository();
        const cardCreateServices = new CardCreateServices_1.CardCreateServices(cardRepository);
        const { cards } = await cardCreateServices.execute_allcards({
            user_id,
            page: Number(page),
            limit: Number(limit),
        });
        return res.json(cards);
    }
    async update(req, res) {
        const { id } = req.query;
        const user_id = req.user.id;
        const { portuguese, english } = req.body;
        const cardRepository = new CardRepository_1.CardRepository();
        const cardCreateServices = new CardCreateServices_1.CardCreateServices(cardRepository);
        await cardCreateServices.execute_update({ id: Number(id), user_id, portuguese, english });
        return res.json({ message: "Card Atualizado" });
    }
    async delete(req, res) {
        const { id } = req.query;
        const user_id = req.user.id;
        const convert_array_id = JSON.parse(id);
        const cardRepository = new CardRepository_1.CardRepository();
        const cardCreateServices = new CardCreateServices_1.CardCreateServices(cardRepository);
        await cardCreateServices.execute_delete({ id: convert_array_id, user_id });
        return res.json({ message: "Card deletado com sucesso" });
    }
}
exports.CardController = CardController;
