import { Cards } from "../../@types/Cards";
import { CardUpdate } from "../CardRepository";

class CardRepositoryInMemory {
  cards: Cards[] = [];
  async sameCard(portuguese: string) {
    const [verifyCards] = this.cards.filter((card) => card.portuguese === portuguese);

    return verifyCards;
  }

  async create({ user_id, portuguese, english }: Cards) {
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

  async getCard(user_id: number) {
    const cards = this.cards.filter((card) => card.user_id === user_id);

    return cards;
  }

  async update({ id, user_id, portuguese, english }: CardUpdate) {
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

  async delete(id: number) {
    const del_card = this.cards.filter((card) => card.id === id).pop() as Cards;
    let randomID = Math.floor(Math.random() * 100);

    return { id: randomID };
  }
}

export { CardRepositoryInMemory };
