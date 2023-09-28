require("express-async-errors");
import express, { Request, Response, NextFunction } from "express";
import { routes } from "./routes";
import { UPLOAD_FOLDER } from "./configs/upload";
import cors from "cors";

import http from "http";
import { Server } from "socket.io";

import { AppError } from "./utils/AppError";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "https://lk-cards.vercel.app",
      "http://lk-cards.vercel.app",
      "http://lkcards-api.onrender.com",
      "https://lkcards-api.onrender.com",
    ],
    credentials: true,
  })
);

// try cors header
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

app.use("/files", express.static(UPLOAD_FOLDER));

app.use(routes);

//server chat
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", //url to connect chat
    methods: ["GET", "POST"],
  },
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

  socket.on("send-message", (data) => {
    const { receiveUser } = data;
    const [user]: any = activeUsers.filter((user) => user.userId === receiveUser);
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
