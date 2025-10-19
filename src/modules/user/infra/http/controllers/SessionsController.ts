import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToPlain } from "class-transformer"; // Para a View!

import AuthenticateUserService from "@modules/user/services/AuthenticateUserService";

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    // 1. Pegar os dados do login
    const { email, password } = request.body;

    // 2. Resolver (pegar) o Service
    const authenticateUser = container.resolve(AuthenticateUserService);

    // 3. Executar o Service
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    // 4. Aplicar a "View" para remover a senha
    const userView = classToPlain(user);

    // 5. Retornar a resposta
    return response.json({ user: userView, token });
  }
}

export default SessionsController;
