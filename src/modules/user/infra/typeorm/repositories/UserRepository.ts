import { Repository } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm/datasource";
import IUserRepository from "@modules/user/repositories/IUserRepository";
import User from "../entities/User";
import CreateUserDTO from "@modules/user/dtos/CreateUserDTO";

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user || undefined;
  }

  public async create(data: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);
    await this.ormRepository.save(user);
    return user;
  }
}

export default UserRepository;
