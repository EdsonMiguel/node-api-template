import User from "../infra/typeorm/entities/User";
import CreateUserDTO from "../dtos/CreateUserDTO"; // 1. Importe o DTO

interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;

  // 2. Mude a assinatura do 'create' para usar o DTO
  create(data: CreateUserDTO): Promise<User>;
}

export default IUserRepository;
