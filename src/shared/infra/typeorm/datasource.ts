import "dotenv/config"; // Carrega o .env
import "reflect-metadata"; // Carrega os metadados
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  synchronize: false, // NUNCA use true em produção. Usaremos migrations.
  logging: true, // Mostra o SQL no console (ótimo para dev)

  // Onde o TypeORM vai procurar por arquivos de Entidade
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  // Onde o TypeORM vai procurar por arquivos de Migration
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});
