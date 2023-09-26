"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const upload_1 = require("./configs/upload");
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const AppError_1 = require("./utils/AppError");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/files", express_1.default.static(upload_1.UPLOAD_FOLDER));
app.use(routes_1.routes);
//server chat
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
let activeUsers = [];
io.on("connection", (socket) => {
    //add new user
    socket.on("new-user-add", (newUserId) => {
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id,
            });
        }
        console.log("Connected Users", activeUsers);
        socket.emit("get-users", activeUsers);
    });
    socket.on("send-message", (data) => {
        const { receiveUser } = data;
        const [user] = activeUsers.filter((user) => user.userId === receiveUser);
        if (user) {
            socket.to(user.socketId).emit("receive-message", data);
        }
    });
    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("User disconnected", activeUsers);
        socket.emit("get-users", activeUsers);
    });
});
const PORT = 8080;
app.use((error, req, res, next) => {
    if (error instanceof AppError_1.AppError) {
        return res.status(error.statusCode).json({ status: "error", message: error.message });
    }
    return res.status(500).json({ status: error, message: "Server error" });
});
server.listen(PORT, () => {
    return console.log(`Server ok PORT ${PORT}`);
});
/*
app.listen(PORT, () => {
  return console.log(`Server ok PORT ${PORT}`);
});*/
