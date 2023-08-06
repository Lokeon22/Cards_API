require("express-async-errors");
import express, { Request, Response, NextFunction } from "express";
import { routes } from "./routes";
import cors from "cors";

import { AppError } from "./utils/AppError";

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

const PORT = 8080;

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ status: "error", message: error.message });
  }

  return res.status(500).json({ status: error, message: "Server error" });
});

app.listen(PORT, () => {
  return console.log(`Server ok PORT ${PORT}`);
});
