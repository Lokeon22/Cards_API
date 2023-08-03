import { CardRepository, CardsProps, CardUpdate } from "../repositories/CardRepository";
import { AppError } from "../utils/AppError";

class CardCreateServices {
  cardRepository;
  constructor(cardRepository: CardRepository) {
    this.cardRepository = cardRepository;
  }

  async execute({ user_id, portuguese, english }: CardsProps) {
    if (!portuguese || !english) throw new AppError("Preencha todos os campos");

    const card = await this.cardRepository.sameCard(portuguese);

    if (card) throw new AppError("Essa frase já foi adicionada");

    const { card_id } = await this.cardRepository.create({ user_id, portuguese, english });

    return { card_id };
  }

  async execute_allcards(user_id: number) {
    const cards = await this.cardRepository.getCard(user_id);

    return { cards };
  }

  async execute_update({ id, user_id, portuguese, english }: CardUpdate) {
    const update = await this.cardRepository.update({ id, user_id, portuguese, english });

    return update;
  }

  async execute_delete({ id, user_id }: { id: number; user_id: number }) {
    const [get_card] = await this.cardRepository.getCard(user_id);

    if (!get_card) throw new AppError("Nenhum card encontrado");

    if (get_card.user_id !== user_id) throw new AppError("Usuário sem permissão");

    const del_card = await this.cardRepository.delete(id);

    return { id: del_card };
  }
}

export { CardCreateServices };
