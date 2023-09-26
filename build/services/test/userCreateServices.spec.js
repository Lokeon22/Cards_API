"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepositoryInMemory_1 = require("../../repositories/repo_memory/UserRepositoryInMemory");
const AppError_1 = require("../../utils/AppError");
const UserCreateServices_1 = require("../UserCreateServices");
describe("Create user", () => {
    let userRepositoryInMemory;
    let userCreateService;
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory_1.UserRepositoryInMemory();
        userCreateService = new UserCreateServices_1.UserCreateServices(userRepositoryInMemory);
    });
    it("user should be created", async () => {
        const userData = {
            name: "test",
            email: "test@gmail.com",
            password: "123",
        };
        const userCreated = await userCreateService.execute(userData);
        expect(userCreated).toHaveProperty("id");
    });
    it("If email exists return error", async () => {
        const user1 = {
            name: "test1",
            email: "teste@gmail.com",
            password: "123",
        };
        const user2 = {
            name: "test2",
            email: "teste@gmail.com",
            password: "123",
        };
        await userCreateService.execute(user1);
        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError_1.AppError("Email já existe"));
    });
});
