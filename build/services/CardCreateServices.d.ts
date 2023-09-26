import { CardRepository, CardsProps, CardUpdate } from "../repositories/CardRepository";
declare class CardCreateServices {
    cardRepository: CardRepository;
    constructor(cardRepository: CardRepository);
    execute({ user_id, portuguese, english }: CardsProps): Promise<{
        card_id: number;
    }>;
    execute_allcards({ user_id, page, limit, }: {
        user_id: number;
        page?: number;
        limit?: number;
    }): Promise<{
        cards: import("../@types/Cards").Cards[];
    }>;
    execute_update({ id, user_id, portuguese, english }: CardUpdate): Promise<{
        id: number;
    }>;
    execute_delete({ id, user_id }: {
        id: number[];
        user_id: number;
    }): Promise<{
        id: {
            id: import("../@types/Cards").Cards[];
        };
    }>;
}
export { CardCreateServices };
