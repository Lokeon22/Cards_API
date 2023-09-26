"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsController = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const SessionsLoginServices_1 = require("../services/SessionsLoginServices");
class SessionsController {
    async create(req, res) {
        const { email, password } = req.body;
        const userRepository = new UserRepository_1.UserRepository();
        const sessionsLoginServices = new SessionsLoginServices_1.SessionsLoginServices(userRepository);
        const { user, token } = await sessionsLoginServices.execute({ email, password });
        return res.json({ user, token });
    }
}
exports.SessionsController = SessionsController;
