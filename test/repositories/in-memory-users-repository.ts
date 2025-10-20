import IUserRepository from "@modules/user/repositories/IUserRepository";
import User from "@modules/user/infra/typeorm/entities/User";

class InMemoryUsersRepository implements IUserRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}

export default InMemoryUsersRepository;
