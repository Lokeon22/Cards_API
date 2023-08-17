require("express-async-errors");
import express, { Request, Response, NextFunction } from "express";
import { routes } from "./routes";
import cors from "cors";

import http from "http";
import { Server } from "socket.io";

import { AppError } from "./utils/AppError";

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

//server chat
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.emit("receive_message", data);
    socket.to(data.room).emit("receive_message", data);
  });
});

let activeUsers: any[] = [];

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

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User disconnected", activeUsers);
    socket.emit("get-users", activeUsers);
  });
});

const PORT = 8080;

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
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
