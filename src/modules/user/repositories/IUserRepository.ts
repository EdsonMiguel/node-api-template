import User from "../infra/typeorm/entities/User";
import CreateUserDTO from "../dtos/CreateUserDTO";

interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  create(data: CreateUserDTO): Promise<User>;
}

export default IUserRepository;
