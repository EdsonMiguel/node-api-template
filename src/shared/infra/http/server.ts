import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import AppError from "@shared/errors/AppError";
import routes from "./routes";
import { AppDataSource } from "@shared/infra/typeorm/datasource";
import "@shared/container";
import cookieParser from "cookie-parser";

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Conectado ao banco de dados com sucesso!");
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());
    app.use(routes);
    app.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: "error",
            message: err.message,
          });
        }
        console.error(err);
        return response.status(500).json({
          status: "error",
          message: "Erro interno do servidor",
        });
      }
    );

    const port = process.env.API_PORT || 3333;
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}!`);
    });
  })
  .catch((err) => {
    console.error("❌ Erro ao inicializar o banco de dados:", err);
  });
