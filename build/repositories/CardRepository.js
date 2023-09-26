"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRepository = void 0;
const knex_1 = require("../database/knex");
class CardRepository {
    async sameCard(portuguese) {
        const verifyCards = await (0, knex_1.connection)("cards").where({ portuguese }).first();
        return verifyCards;
    }
    async create({ user_id, portuguese, english }) {
        const [create_card] = await (0, knex_1.connection)("cards").insert({
            user_id,
            portuguese,
            english,
        });
        return { card_id: create_card };
    }
    async getCard({ user_id, page, limit }) {
        //pagination
        if (!page)
            page = 1;
        if (!limit)
            limit = 8;
        const cards = await (0, knex_1.connection)("cards")
            .where({ user_id })
            .limit(limit)
            .offset((page - 1) * limit);
        return cards;
    }
    async update({ id, user_id, portuguese, english }) {
        const [select_card] = (await this.getCard({ user_id })).filter((card) => card.id === id);
        const update_card = await (0, knex_1.connection)("cards")
            .where({ id })
            .update({
            portuguese: portuguese ?? select_card.portuguese,
            english: english ?? select_card.english,
        });
        return { id: update_card };
    }
    async delete({ id, user_id }) {
        const del_card = await (0, knex_1.connection)("cards").where({ user_id }).whereIn("id", id).del();
        return { id: del_card };
    }
}
exports.CardRepository = CardRepository;
