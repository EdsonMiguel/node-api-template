import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError"; // Nossa classe de erro
import User from "../infra/typeorm/entities/User";
import CreateUserDTO from "../dtos/CreateUserDTO";
import IUserRepository from "../repositories/IUserRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

// 1. "Avisamos" ao TSyringe que esta classe pode ser injetada
@injectable()
class CreateUserService {
  // 2. Usamos o construtor para receber nossas dependências (as interfaces)
  constructor(
    // 3. TSyringe, injete aqui a implementação de 'IUserRepository'
    @inject("UserRepository")
    private userRepository: IUserRepository,

    // 4. TSyringe, injete aqui a implementação de 'HashProvider'
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  // 5. Este é o "Caso de Uso" (a lógica de negócio)
  public async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<User> {
    // --- Início das Regras de Negócio ---

    // Regra 1: Verificar se o email já existe
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("Este endereço de email já está em uso.");
    }

    // Regra 2: Criptografar a senha
    // Note que chamamos a INTERFACE, não o Bcrypt diretamente
    const hashedPassword = await this.hashProvider.generateHash(password);

    // --- Fim das Regras de Negócio ---

    // 6. Passa os dados (com a senha criptografada) para o repositório
    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // 7. Retorna o usuário criado para o Controller
    return user;
  }
}

export default CreateUserService;
