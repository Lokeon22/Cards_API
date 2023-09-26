"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRoutes = void 0;
const express_1 = require("express");
const SessionsController_1 = require("../controllers/SessionsController");
const sessionRoutes = (0, express_1.Router)();
exports.sessionRoutes = sessionRoutes;
const sessionsController = new SessionsController_1.SessionsController();
sessionRoutes.post("/login", sessionsController.create);
