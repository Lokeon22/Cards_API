"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarController = void 0;
const knex_1 = require("../database/knex");
const DiskStorage_1 = require("../providers/DiskStorage");
const AppError_1 = require("../utils/AppError");
class AvatarController {
    async update(req, res) {
        const id = req.user.id;
        const image = req.file?.filename;
        const user = await (0, knex_1.connection)("users").where({ id }).first();
        const diskStorage = new DiskStorage_1.DiskStorage();
        if (!user)
            throw new AppError_1.AppError("Usuario não encontrado");
        if (!image)
            throw new AppError_1.AppError("Insira uma imagem");
        const filename = await diskStorage.saveFile(image);
        if (user && user.avatar) {
            await diskStorage.deleteFile(user.avatar);
            await (0, knex_1.connection)("users").where({ id }).update({
                avatar: filename,
            });
        }
        else {
            await (0, knex_1.connection)("users").where({ id }).update({
                avatar: filename,
            });
        }
        return res.json({ message: "Avatar atualizado" });
    }
}
exports.AvatarController = AvatarController;
