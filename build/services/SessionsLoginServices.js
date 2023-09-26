"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsLoginServices = void 0;
const auth_1 = require("../configs/auth");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = require("../utils/AppError");
class SessionsLoginServices {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ email, password }) {
        const user = await this.userRepository.verifyEmailExists(email);
        if (!user)
            throw new AppError_1.AppError("Email e/ou senha incorretas");
        const verifyPass = await (0, bcrypt_1.compare)(password, user.password);
        if (!verifyPass)
            throw new AppError_1.AppError("Email e/ou senha incorretas");
        const { secret, expiresIn } = auth_1.authConfigs.jwt;
        const token = (0, jsonwebtoken_1.sign)({}, secret, {
            subject: String(user.id),
            expiresIn,
        });
        return { user, token };
    }
}
exports.SessionsLoginServices = SessionsLoginServices;
