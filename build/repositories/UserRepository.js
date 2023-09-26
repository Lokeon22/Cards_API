"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const knex_1 = require("../database/knex");
class UserRepository {
    async verifyEmailExists(email) {
        const verifyEmail = await (0, knex_1.connection)("users").where({ email }).first();
        return verifyEmail;
    }
    async verifyUserExists(id) {
        const user = await (0, knex_1.connection)("users").where({ id }).first();
        return user;
    }
    async allUsers() {
        const users = await (0, knex_1.connection)("users");
        return users;
    }
    async create({ name, email, password }) {
        const [user_id] = await (0, knex_1.connection)("users").insert({ name, email, password });
        return { id: user_id };
    }
    async update({ name, email, id }) {
        const user = await this.verifyUserExists(id);
        const update_user = await (0, knex_1.connection)("users")
            .where({ id })
            .update({
            name: name ?? user.name,
            email: email ?? user.email,
        });
        return { id: update_user };
    }
}
exports.UserRepository = UserRepository;
