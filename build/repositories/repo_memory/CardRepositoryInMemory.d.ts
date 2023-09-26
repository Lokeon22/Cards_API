import { Cards } from "../../@types/Cards";
import { CardUpdate } from "../CardRepository";
declare class CardRepositoryInMemory {
    cards: Cards[];
    sameCard(portuguese: string): Promise<Cards>;
    create({ user_id, portuguese, english }: Cards): Promise<{
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
export { CardRepositoryInMemory };
