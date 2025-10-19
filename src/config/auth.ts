import "dotenv/config"; // Garante que o .env seja lido

// Interface para garantir o formato do nosso config
interface IAuthConfig {
  jwt: {
    secret: string; // O tipo agora é só 'string'
    expiresIn: string;
  };
}

// 1. Verificamos se a variável de ambiente FOI DEFINIDA
if (!process.env.JWT_SECRET) {
  // 2. Se não foi, o app "quebra" imediatamente.
  // Isso é uma 'fail-fast' e é uma BOA PRÁTICA de segurança.
  throw new Error("FATAL_ERROR: Variável JWT_SECRET não definida no .env");
}

// 3. Exportamos o objeto, agora com 100% de certeza
//    de que 'secret' é uma string.
const authConfig: IAuthConfig = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  },
};

export default authConfig;
