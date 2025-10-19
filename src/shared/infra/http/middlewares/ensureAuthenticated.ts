import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken"; // 1. Importa o 'verify'

import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";

// Interface para definir o formato do payload que *nós* criamos
interface ITokenPayload extends JwtPayload {
  name: string;
  email: string;
  // 'sub' já é padrão do JwtPayload
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  // 1. Pegar o token do cabeçalho de 'Authorization'
  const authHeader = request.headers.authorization;

  // 2. Se o token não existir, barra a entrada
  if (!authHeader) {
    throw new AppError("Token JWT ausente.", 401);
  }

  // 3. O token vem no formato "Bearer [token]"
  //    Vamos separar o "Bearer" do [token]
  const [, token] = authHeader.split(" "); // Separa por espaço

  try {
    // 4. Verificar se o token é válido
    // O 'verify' vai checar a assinatura (com nosso 'secret') e a expiração.
    // Se falhar, ele *dispara um erro* (que o 'catch' vai pegar).
    const decoded = verify(token, authConfig.jwt.secret);

    // 5. Força o 'decoded' (que é 'string | JwtPayload') a ser do nosso tipo
    const { sub, name, email } = decoded as ITokenPayload;

    // 6. Anexa os dados do usuário ao 'request' (agora o TypeScript deixa!)
    request.user = {
      id: sub as string, // 'sub' é o ID do usuário
      name,
      email,
    };

    // 7. Se tudo deu certo, deixa o usuário "passar" para o Controller
    return next();
  } catch (err) {
    // Se o 'verify' falhou (token expirado, assinatura inválida, etc.)
    throw new AppError("Token JWT inválido.", 401);
  }
}
