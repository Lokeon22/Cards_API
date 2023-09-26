"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const UserCreateServices_1 = require("../services/UserCreateServices");
const knex_1 = require("../database/knex");
class UserController {
    async create(req, res) {
        const { name, email, password } = req.body;
        const userRepository = new UserRepository_1.UserRepository();
        const userCreateService = new UserCreateServices_1.UserCreateServices(userRepository);
        await userCreateService.execute({ name, email, password });
        return res.json({ message: "Conta criada" });
    }
    async index(req, res) {
        const { id } = req.params;
        const filtered = await (0, knex_1.connection)("users").where({ id }).first();
        return res.json(filtered);
    }
    async show(req, res) {
        const id = req.user.id;
        const user = await new UserRepository_1.UserRepository().verifyUserExists(id);
        return res.json(user);
    }
    async allusers(req, res) {
        const users = await new UserRepository_1.UserRepository().allUsers();
        return res.json(users);
    }
    async update(req, res) {
        const id = req.user.id;
        const { name, email } = req.body;
        const userRepository = new UserRepository_1.UserRepository();
        const userCreateService = new UserCreateServices_1.UserCreateServices(userRepository);
        await userCreateService.execute_update({ id, name, email });
        return res.json({ message: "Perfil atualizado" });
    }
}
exports.UserController = UserController;
