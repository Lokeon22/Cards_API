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

/*
let users: any[] = [];

io.on("connection", (socket) => {
  socket.on("newUser", (data) => {
    users.push(data);
    socket.emit("user_response", users);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    //Sends the list of users to the client
    socket.emit("user_response", users);
    socket.disconnect();
  });
}); */

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
