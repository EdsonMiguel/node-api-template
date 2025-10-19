import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToPlain } from "class-transformer";
import CreateUserService from "@modules/user/services/CreateUserService";

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    const userView = classToPlain(user);

    return response.status(201).json(userView);
  }
}

export default UsersController;
