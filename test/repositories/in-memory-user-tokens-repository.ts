import IUserTokensRepository from "@modules/user/repositories/IUserTokensRepository";
import UserToken from "@modules/user/infra/typeorm/entities/UserToken";

class InMemoryUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  async create(userToken: UserToken): Promise<UserToken> {
    this.userTokens.push(userToken);
    return userToken;
  }
}

export default InMemoryUserTokensRepository;
