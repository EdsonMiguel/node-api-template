import swaggerJsdoc from "swagger-jsdoc";

// Definições do 'swagger-jsdoc'
const options: swaggerJsdoc.Options = {
  // 1. Definições da API (Base OpenAPI)
  definition: {
    openapi: "3.0.0", // Versão do OpenAPI
    info: {
      title: "API Template (Clean Arch + Node.js)",
      version: "1.0.0",
      description: "API de template modular com TypeORM, TSyringe e JWT.",
      contact: {
        name: "Edson Miguel", // Coloque seu nome
        url: "https://github.com/EdsonMiguel", // Seu GitHub
      },
    },
    // Define os servidores (ambientes)
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3333}`,
        description: "Servidor de Desenvolvimento Local",
      },
    ],
    // 2. O "Pulo do Gato" - O Botão "Authorize" (Autenticação JWT)
    components: {
      securitySchemes: {
        // Nome que daremos para a nossa segurança: 'BearerAuth'
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Indica que é um JWT
          description: 'Insira o token JWT no formato: "Bearer {seu_token}"',
        },
      },
    },
    // Define que a segurança 'BearerAuth' pode ser usada globalmente
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  // 3. Caminho para os arquivos que o 'swagger-jsdoc' vai LER
  // Vamos ler as rotas E os DTOs (para os Schemas)
  apis: ["./src/modules/**/*.routes.ts", "./src/modules/**/*.dtos.ts"],
};

// Gera a especificação do Swagger
const specs = swaggerJsdoc(options);

export default specs;
