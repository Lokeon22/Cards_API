"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CardRepositoryInMemory_1 = require("../../repositories/repo_memory/CardRepositoryInMemory");
const CardCreateServices_1 = require("../CardCreateServices");
const AppError_1 = require("../../utils/AppError");
describe("Create card", () => {
    let cardRepositoryInMemory;
    let cardCreateServices;
    beforeEach(() => {
        cardRepositoryInMemory = new CardRepositoryInMemory_1.CardRepositoryInMemory();
        cardCreateServices = new CardCreateServices_1.CardCreateServices(cardRepositoryInMemory);
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
        await expect(cardCreateServices.execute(cardData2)).rejects.toEqual(new AppError_1.AppError("Essa frase já foi adicionada"));
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
