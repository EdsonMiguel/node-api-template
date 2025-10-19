import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToPlain } from "class-transformer";

import AuthenticateUserService from "@modules/user/services/AuthenticateUserService";

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateUserService);

    // 1. O Service agora retorna os DOIS tokens
    const { user, token, refresh_token } = await authenticateUser.execute({
      email,
      password,
    });

    // 2. Aplicar a "View" (remover a senha)
    const userView = classToPlain(user);

    // 3. Criar o Cookie para o Refresh Token
    response.cookie("refreshToken", refresh_token, {
      httpOnly: true, // O JavaScript do frontend NÃO PODE ler este cookie
      secure: process.env.NODE_ENV === "production", // Só enviar em HTTPS (em produção)
      sameSite: "strict", // Ajuda a prevenir ataques CSRF
      // maxAge: ... (poderíamos definir a expiração aqui também)
      path: "/", // O cookie estará disponível em toda a aplicação
    });

    // 4. Retornar a resposta (JSON com o Access Token)
    return response.json({ user: userView, token });
  }
}

export default SessionsController;
