"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryInMemory = void 0;
class UserRepositoryInMemory {
    constructor() {
        this.users = [];
    }
    async verifyEmailExists(email) {
        const verifyEmail = this.users.find((user) => user.email === email);
        return verifyEmail;
    }
    async verifyUserExists(id) {
        const user = this.users.find((user) => user.id === id);
        return user;
    }
    async allUsers() {
        const user1 = {
            id: Math.floor(Math.random() * 100),
            name: "User 1",
            email: "user1@gmail.com",
            password: "123",
            avatar: null,
            background: null,
            created_at: new Date(),
        };
        const user2 = {
            id: Math.floor(Math.random() * 100),
            name: "User 2",
            email: "user2@gmail.com",
            password: "123",
            avatar: null,
            background: null,
            created_at: new Date(),
        };
        this.users.push(user1);
        this.users.push(user2);
        return this.users;
    }
    async create({ name, email, password }) {
        const user = {
            id: Math.floor(Math.random() * 100),
            name,
            email,
            password,
            avatar: null,
            background: null,
            created_at: new Date(),
        };
        this.users.push(user);
        return { id: user.id };
    }
    async update({ name, email, id }) {
        const user = await this.verifyUserExists(id);
        let [users] = [
            {
                id,
                name: name ?? user.name,
                email: email ?? user.email,
            },
        ];
        return { id: users.id };
    }
}
exports.UserRepositoryInMemory = UserRepositoryInMemory;
