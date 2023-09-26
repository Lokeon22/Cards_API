"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreateServices = void 0;
const bcrypt_1 = require("bcrypt");
const AppError_1 = require("../utils/AppError");
class UserCreateServices {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ name, email, password }) {
        if (!name || !email || !password) {
            throw new AppError_1.AppError("Preencha todos os campos");
        }
        const verifyEmail = await this.userRepository.verifyEmailExists(email);
        if (verifyEmail)
            throw new AppError_1.AppError("Email já existe");
        const hashPass = await (0, bcrypt_1.hash)(password, 8);
        const userCreated = await this.userRepository.create({
            name,
            email,
            password: hashPass,
        });
        return userCreated;
    }
    async execute_update({ id, name, email }) {
        const user = await this.userRepository.verifyUserExists(id);
        if (!user)
            throw new AppError_1.AppError("Usuário não encontrado");
        const update = await this.userRepository.update({ id, name, email });
        return update;
    }
}
exports.UserCreateServices = UserCreateServices;
