import "reflect-metadata";

import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import cors from "cors";

import AppError from "./app/errors/AppError";
import createConnection from "./database";
// import "./database";
import routes from "./routes";

createConnection();

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    console.log(err);

    return res.status(500).json({
      type: "error",
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

export default app;
