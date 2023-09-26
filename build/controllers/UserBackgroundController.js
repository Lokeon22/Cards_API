"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackgroundController = void 0;
const knex_1 = require("../database/knex");
const DiskStorage_1 = require("../providers/DiskStorage");
const AppError_1 = require("../utils/AppError");
class BackgroundController {
    async update(req, res) {
        const id = req.user.id;
        const background_image = req.file?.filename;
        const user = await (0, knex_1.connection)("users").where({ id }).first();
        const diskStorage = new DiskStorage_1.DiskStorage();
        if (!user)
            throw new AppError_1.AppError("Usuario não encontrado");
        if (!background_image)
            throw new AppError_1.AppError("Insira uma imagem");
        const filename = await diskStorage.saveFile(background_image);
        if (user && user.background) {
            await diskStorage.deleteFile(user.background);
            await (0, knex_1.connection)("users").where({ id }).update({
                background: filename,
            });
        }
        else {
            await (0, knex_1.connection)("users").where({ id }).update({
                background: filename,
            });
        }
        return res.json({ message: "Background atualizado" });
    }
}
exports.BackgroundController = BackgroundController;
