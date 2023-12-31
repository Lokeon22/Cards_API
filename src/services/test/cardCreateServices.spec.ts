import { CardRepositoryInMemory } from "../../repositories/repo_memory/CardRepositoryInMemory";
import { CardCreateServices } from "../CardCreateServices";
import { AppError } from "../../utils/AppError";

describe("Create card", () => {
  let cardRepositoryInMemory: CardRepositoryInMemory;
  let cardCreateServices: CardCreateServices;

  beforeEach(() => {
    cardRepositoryInMemory = new CardRepositoryInMemory();
    cardCreateServices = new CardCreateServices(cardRepositoryInMemory);
  });

  it("card should be create", async () => {
    const cardData = {
      user_id: 1,
      portuguese: "teste",
      english: "test",
    };

    const card_create = await cardCreateServices.execute(cardData);

    expect(card_create).toHaveProperty("card_id");
  });

  it("should be return error", async () => {
    const cardData = {
      user_id: 1,
      portuguese: "teste",
      english: "test",
    };

    const cardData2 = {
      user_id: 2,
      portuguese: "teste",
      english: "test",
    };

    await cardCreateServices.execute(cardData);
    await expect(cardCreateServices.execute(cardData2)).rejects.toEqual(
      new AppError("Essa frase já foi adicionada")
    );
  });

  it("should be return | id", async () => {
    const cardData = {
      id: 1,
      user_id: 1,
      portuguese: "teste",
      english: "test",
    };

    const cardData2 = {
      id: 2,
      user_id: 1,
      portuguese: "teste2",
      english: "test2",
    };

    let user_request_toDelete = { id: [1, 2], user_id: 1 };

    await cardCreateServices.execute(cardData);
    await cardCreateServices.execute(cardData2);
    const delete_card = await cardCreateServices.execute_delete(user_request_toDelete);
    expect(delete_card).toHaveProperty("id");
  });
});
