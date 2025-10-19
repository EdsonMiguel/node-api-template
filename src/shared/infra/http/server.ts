/* --- REFORÇO: A ORDEM DAS IMPORTAÇÕES É CRÍTICA --- */

// 1. A "cola" dos decorators (TEM QUE SER O PRIMEIRO)
import "reflect-metadata";

// 2. Carrega as variáveis de ambiente (senhas, portas)
import "dotenv/config";

// 3. "Ensina" o Express a lidar com erros em funções async
import "express-async-errors";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import AppError from "@shared/errors/AppError";
import routes from "./routes";

// 4. Importa nossa configuração de banco (TypeORM 0.3+)
import { AppDataSource } from "@shared/infra/typeorm/datasource";

// 5. Importa o container (TSyringe) para carregar as "receitas"
import "@shared/container";

import cookieParser from "cookie-parser"; // 1. IMPORTE

// --- FIM DAS IMPORTAÇÕES ---

// Inicializa a conexão com o banco
AppDataSource.initialize()
  .then(() => {
    // SÓ RODA O SERVIDOR DEPOIS QUE O BANCO CONECTAR
    console.log("📦 Conectado ao banco de dados com sucesso!");

    const app = express(); // Cria a instância do Express

    // Middlewares globais
    app.use(cors()); // Habilita CORS
    app.use(express.json()); // Habilita o Express para ler JSON no body
    app.use(cookieParser());

    // Rotas
    app.use(routes); // Usa nosso roteador principal

    // "Para-raios" (Middleware de Erros)
    // REFORÇO: Tem que vir DEPOIS das rotas.
    app.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        // Se for um erro conhecido (que nós criamos)
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: "error",
            message: err.message,
          });
        }
        // Se for um erro desconhecido (bug)
        console.error(err); // Logar o erro
        return response.status(500).json({
          status: "error",
          message: "Erro interno do servidor",
        });
      }
    );

    // Start do servidor
    const port = process.env.API_PORT || 3333;
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}!`);
    });
  })
  .catch((err) => {
    // Se a conexão com o banco falhar, o app nem sobe.
    console.error("❌ Erro ao inicializar o banco de dados:", err);
  });
