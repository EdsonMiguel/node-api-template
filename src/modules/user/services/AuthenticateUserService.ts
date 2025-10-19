import { injectable, inject } from "tsyringe";
import { sign, SignOptions } from "jsonwebtoken";
import { addDays } from "date-fns";
import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import IUserRepository from "../repositories/IUserRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponseDTO {
  user: User;
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,

    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
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

    const { secret, expiresIn } = authConfig.jwt;

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };

    const token = sign(payload, secret, {
      expiresIn,
    } as SignOptions);

    const {
      secret: refreshTokenSecret,
      expiresIn: refreshTokenExpiresIn,
      expiresInDays: refreshTokenExpiresInDays,
    } = authConfig.refreshToken;

    const refreshToken = sign({}, refreshTokenSecret, {
      subject: user.id,
      expiresIn: refreshTokenExpiresIn,
    } as SignOptions);

    const expires_at = addDays(new Date(), refreshTokenExpiresInDays);

    await this.userTokensRepository.create({
      token: refreshToken,
      user_id: user.id,
      expires_at,
    });

    return {
      user,
      token,
      refresh_token: refreshToken,
    };
  }
}

export default AuthenticateUserService;
