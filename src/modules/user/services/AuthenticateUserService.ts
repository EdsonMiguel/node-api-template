import { injectable, inject } from "tsyringe";
// No topo do arquivo
import { sign, SignOptions } from "jsonwebtoken"; // 1. IMPORTE O TIPO
// .../ 1. Importa a função de "assinar"

import authConfig from "@config/auth"; // 2. Nossas configurações de segredo
import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import IUserRepository from "../repositories/IUserRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

// DTO (Data Transfer Object) para a requisição
interface IRequestDTO {
  email: string;
  password: string;
}

// DTO para a resposta
interface IResponseDTO {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    // --- Regras de Negócio do Login ---

    // 1. Verificar se o usuário existe
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      // Usamos uma mensagem genérica por segurança
      throw new AppError("Email ou senha incorretos.", 401);
    }

    // 2. Verificar se a senha bate (comparando a senha pura com o hash)
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password // O hash que está salvo no banco
    );

    if (!passwordMatched) {
      throw new AppError("Email ou senha incorretos.", 401);
    }

    // 3. Gerar o Token JWT
    const { secret, expiresIn } = authConfig.jwt;

    // 3a. Coloque o 'subject' DENTRO do payload, usando a claim 'sub'
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      // Você pode adicionar outras informações "não-sensíveis" aqui se quiser
      // ex: name: user.name,
    };

    // 3b. Agora, a assinatura da função 'sign' fica inequívoca
    const token = sign(
      payload, // 1. O Payload com o 'sub'
      secret, // 2. O Segredo (que agora é 100% string)
      {
        // 3. As Opções
        expiresIn,
      } as SignOptions // <-- 3. TIPAGEM explícita aqui
    );

    // 4. Retornar o usuário e o token
    return { user, token };
  }
}

export default AuthenticateUserService;
