import { container } from "tsyringe";

/* --- Hash Provider (Já estava aqui) --- */
import IHashProvider from "@modules/user/providers/HashProvider/models/IHashProvider";
import BcryptHashProvider from "@modules/user/providers/HashProvider/implementations/BcryptHashProvider";

container.registerSingleton<IHashProvider>("HashProvider", BcryptHashProvider);

/* --- User Repository (NOVO!) --- */
import IUserRepository from "@modules/user/repositories/IUserRepository";
import UserRepository from "@modules/user/infra/typeorm/repositories/UserRepository";

// "Receita" nova:
// Quando alguém pedir 'UserRepository' (Contrato),
// entregue uma instância Singleton (única) de 'UserRepository' (Implementação).
container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

/* --- Hash Provider --- */
// ... (registro do HashProvider) ...

/* --- User Repository --- */
// ... (registro do IUserRepository) ...

/* --- User Tokens Repository (NOVO!) --- */
import IUserTokensRepository from "@modules/user/repositories/IUserTokensRepository";
import UserTokensRepository from "@modules/user/infra/typeorm/repositories/UserTokensRepository";

container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository
);
