import { connection as knex } from "../database/knex";
import { Cards } from "../@types/Cards";

export type CardsProps = Pick<Cards, "user_id" | "portuguese" | "english">;
export type CardUpdate = Omit<Cards, "created_at">;

class CardRepository {
  async sameCard(portuguese: string) {
    const verifyCards: Cards = await knex("cards").where({ portuguese }).first();

    return verifyCards;
  }

  async create({ user_id, portuguese, english }: CardsProps) {
    const [create_card] = await knex("cards").insert({
      user_id,
      portuguese,
      english,
    });

    return { card_id: create_card };
  }

  async getCard(user_id: number) {
    const cards: Cards[] = await knex("cards").where({ user_id });

    return cards;
  }

  async update({ id, user_id, portuguese, english }: CardUpdate) {
    const [select_card] = (await this.getCard(user_id)).filter((card) => card.id === id);

    const update_card = await knex("cards")
      .where({ id })
      .update({
        portuguese: portuguese ?? select_card.portuguese,
        english: english ?? select_card.english,
      });

    return { id: update_card };
  }

  async delete(id: number) {
    const del_card = await knex("cards").where({ id }).first().delete();

    return { id: del_card };
  }
}

export { CardRepository };
