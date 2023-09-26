"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardCreateServices = void 0;
const AppError_1 = require("../utils/AppError");
class CardCreateServices {
    constructor(cardRepository) {
        this.cardRepository = cardRepository;
    }
    async execute({ user_id, portuguese, english }) {
        if (!portuguese || !english)
            throw new AppError_1.AppError("Preencha todos os campos");
        const card = await this.cardRepository.sameCard(portuguese);
        if (card)
            throw new AppError_1.AppError("Essa frase já foi adicionada");
        const { card_id } = await this.cardRepository.create({ user_id, portuguese, english });
        return { card_id };
    }
    async execute_allcards({ user_id, page, limit, }) {
        const cards = await this.cardRepository.getCard({ user_id, page, limit });
        return { cards };
    }
    async execute_update({ id, user_id, portuguese, english }) {
        const update = await this.cardRepository.update({ id, user_id, portuguese, english });
        return update;
    }
    async execute_delete({ id, user_id }) {
        const get_card = await this.cardRepository.getCard({ user_id });
        if (!get_card)
            throw new AppError_1.AppError("Nenhum card encontrado");
        const del_card = await this.cardRepository.delete({ id, user_id });
        return { id: del_card };
    }
}
exports.CardCreateServices = CardCreateServices;
