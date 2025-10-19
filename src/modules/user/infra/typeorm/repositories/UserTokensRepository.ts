import { Repository } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm/datasource";
import IUserTokensRepository, {
  ICreateUserTokenDTO,
} from "@modules/user/repositories/IUserTokensRepository";
import UserToken from "../entities/UserToken";

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(UserToken);
  }

  public async create({
    user_id,
    token,
    expires_at,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
      token,
      expires_at,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
