import { container } from "tsyringe";
import IHashProvider from "@modules/user/providers/HashProvider/models/IHashProvider";
import BcryptHashProvider from "@modules/user/providers/HashProvider/implementations/BcryptHashProvider";
import IUserRepository from "@modules/user/repositories/IUserRepository";
import UserRepository from "@modules/user/infra/typeorm/repositories/UserRepository";
import IUserTokensRepository from "@modules/user/repositories/IUserTokensRepository";
import UserTokensRepository from "@modules/user/infra/typeorm/repositories/UserTokensRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IHashProvider>("HashProvider", BcryptHashProvider);
container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository
);
