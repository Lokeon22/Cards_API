import { Cards } from "../@types/Cards";
export type CardsProps = Pick<Cards, "user_id" | "portuguese" | "english">;
export type CardUpdate = Omit<Cards, "created_at">;
declare class CardRepository {
    sameCard(portuguese: string): Promise<Cards>;
    create({ user_id, portuguese, english }: CardsProps): Promise<{
        card_id: number;
    }>;
    getCard({ user_id, page, limit }: {
        user_id: number;
        page?: number;
        limit?: number;
    }): Promise<Cards[]>;
    update({ id, user_id, portuguese, english }: CardUpdate): Promise<{
        id: number;
    }>;
    delete({ id, user_id }: {
        id: number[];
        user_id: number;
    }): Promise<{
        id: Cards[];
    }>;
}
export { CardRepository };
