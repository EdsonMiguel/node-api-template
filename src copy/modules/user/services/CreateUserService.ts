import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import CreateUserDTO from "../dtos/CreateUserDTO";
import IUserRepository from "../repositories/IUserRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

@injectable()
class CreateUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("Este endereço de email já está em uso.", 409);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
