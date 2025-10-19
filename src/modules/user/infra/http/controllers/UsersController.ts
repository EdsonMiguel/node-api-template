import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToPlain } from "class-transformer"; // 1. Para a View!

import CreateUserService from "@modules/user/services/CreateUserService";

class UsersController {
  // Método para CRIAR um usuário
  public async create(request: Request, response: Response): Promise<Response> {
    // 1. Pegar os dados do corpo da requisição (o JSON)
    const { name, email, password } = request.body;

    // 2. Pedir ao "Encanador" (TSyringe) uma instância do "Cérebro" (Service)
    // O TSyringe vai automaticamente injetar o UserRepository e o HashProvider
    // dentro do CreateUserService para nós.
    const createUserService = container.resolve(CreateUserService);

    // 3. Executar o "Cérebro" (Service) com os dados da requisição
    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    // 4. A CAMADA DE VIEW (Segurança)
    // Antes de retornar o usuário, passamos ele pelo 'classToPlain'
    // Isso vai LER os decorators @Exclude (na senha) e @Expose
    // e vai remover a senha do objeto JSON de resposta.
    const userView = classToPlain(user);

    // 5. Retornar a resposta (com o usuário filtrado e status 201 - Created)
    return response.status(201).json(userView);
  }

  // Futuramente, teremos outros métodos aqui:
  // public async update(...) {}
  // public async show(...) {}
}

export default UsersController;
