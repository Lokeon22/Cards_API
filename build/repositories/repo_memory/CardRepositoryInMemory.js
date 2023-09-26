"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRepositoryInMemory = void 0;
class CardRepositoryInMemory {
    constructor() {
        this.cards = [];
    }
    async sameCard(portuguese) {
        const [verifyCards] = this.cards.filter((card) => card.portuguese === portuguese);
        return verifyCards;
    }
    async create({ user_id, portuguese, english }) {
        const create_card = {
            id: Math.floor(Math.random() * 100),
            user_id,
            english,
            portuguese,
            created_at: new Date(),
        };
        this.cards.push(create_card);
        return { card_id: create_card.user_id };
    }
    async getCard({ user_id, page, limit }) {
        if (!page)
            page = 1;
        if (!limit)
            limit = 8;
        const cards = this.cards.filter((card) => card.user_id === user_id);
        return cards;
    }
    async update({ id, user_id, portuguese, english }) {
        const [select_card] = this.cards.filter((card) => card.id === id);
        const update_card = this.cards.push({
            id,
            user_id,
            portuguese: portuguese ?? select_card.portuguese,
            english: english ?? select_card.english,
            created_at: new Date(),
        });
        return { id: update_card };
    }
    async delete({ id, user_id }) {
        const [del_card] = id.map((n) => {
            return this.cards.filter((card) => card.id === n);
        });
        return { id: del_card };
    }
}
exports.CardRepositoryInMemory = CardRepositoryInMemory;
