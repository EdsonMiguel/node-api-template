import { injectable, inject } from "tsyringe";
import { sign, SignOptions } from "jsonwebtoken"; // <- Não mudou
import { addDays } from "date-fns"; // <- (Vamos instalar esta lib)

import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import IUserRepository from "../repositories/IUserRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUserTokensRepository from "../repositories/IUserTokensRepository"; // 1. IMPORTA O NOVO REPOSITÓRIO

// Interface da Requisição (não mudou)
interface IRequestDTO {
  email: string;
  password: string;
}

// Interface da Resposta (AGORA VAI MUDAR)
interface IResponseDTO {
  user: User;
  token: string; // O Access Token (crachá)
  refresh_token: string; // O Refresh Token (chave mestra)
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,

    // 2. INJETA O NOVO REPOSITÓRIO
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    // --- 1. Validar Usuário e Senha (Não mudou) ---
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email ou senha incorretos.", 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    );
    if (!passwordMatched) {
      throw new AppError("Email ou senha incorretos.", 401);
    }

    // --- 2. Gerar o Access Token (Crachá de 15min) ---
    const { secret, expiresIn } = authConfig.jwt;

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };

    const token = sign(payload, secret, {
      expiresIn,
    } as SignOptions);

    // --- 3. Gerar o Refresh Token (Chave Mestra de 7 dias) ---
    const {
      secret: refreshTokenSecret,
      expiresIn: refreshTokenExpiresIn,
      expiresInDays: refreshTokenExpiresInDays,
    } = authConfig.refreshToken;

    // O payload do Refresh Token só precisa do ID do usuário
    const refreshToken = sign({}, refreshTokenSecret, {
      subject: user.id, // Usando 'subject' aqui (padrão)
      expiresIn: refreshTokenExpiresIn,
    } as SignOptions);

    // 4. Calcular a data de expiração do Refresh Token para salvar no BANCO
    const expires_at = addDays(new Date(), refreshTokenExpiresInDays);

    // 5. Salvar o Refresh Token no Banco de Dados
    await this.userTokensRepository.create({
      token: refreshToken,
      user_id: user.id,
      expires_at,
    });

    // 6. Retornar os DOIS tokens
    return {
      user,
      token, // O Access Token (15min)
      refresh_token: refreshToken, // O Refresh Token (7dias)
    };
  }
}

export default AuthenticateUserService;
