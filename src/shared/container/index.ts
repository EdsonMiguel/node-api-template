import { container } from "tsyringe";
import IHashProvider from "@modules/user/providers/HashProvider/models/IHashProvider";
import BcryptHashProvider from "@modules/user/providers/HashProvider/implementations/BcryptHashProvider";
import IUserRepository from "@modules/user/repositories/IUserRepository";
import UserRepository from "@modules/user/infra/typeorm/repositories/UserRepository";
import IUserTokensRepository from "@modules/user/repositories/IUserTokensRepository";
import UserTokensRepository from "@modules/user/infra/typeorm/repositories/UserTokensRepository";
import IProductRepository from "@modules/product/repositories/IProductRepository";
import ProductRepository from "@modules/product/infra/typeorm/repositories/ProductRepository";
import ICategoryRepository from "@modules/category/repositories/ICategoryRepository";
import CategoryRepository from "@modules/category/infra/typeorm/repositories/CategoryRepository";

container.registerSingleton<IProductRepository>(
  "ProductRepository",
  ProductRepository
);
container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IHashProvider>("HashProvider", BcryptHashProvider);
container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository
);

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);
