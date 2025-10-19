import { Repository } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm/datasource"; // 1. O DataSource do TypeORM 0.3+

import IUserRepository from "@modules/user/repositories/IUserRepository"; // 2. O Contrato (Interface)
import User from "../entities/User"; // 3. A Entidade
import CreateUserDTO from "@modules/user/dtos/CreateUserDTO";

// 4. Esta classe "assina" o contrato IUserRepository
class UserRepository implements IUserRepository {
  // 5. Uma variável privada para guardar o repositório do TypeORM
  private ormRepository: Repository<User>;

  constructor() {
    // 6. Pegamos o repositório oficial do User a partir do nosso DataSource
    this.ormRepository = AppDataSource.getRepository(User);
  }

  // --- Implementação dos Métodos do Contrato ---

  // Implementa o findByEmail
  public async findByEmail(email: string): Promise<User | undefined> {
    // O TypeORM 0.3+ retorna 'null' se não achar.
    // O `|| undefined` garante que o contrato (que espera 'undefined') seja cumprido.
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user || undefined;
  }

  // Implementa o create
  public async create(data: CreateUserDTO): Promise<User> {
    // 1. Cria a *instância* da entidade (ainda não salvou)
    const user = this.ormRepository.create(data);

    // 2. Salva a entidade no banco (agora sim, faz o INSERT)
    await this.ormRepository.save(user);

    return user;
  }
}

export default UserRepository;
