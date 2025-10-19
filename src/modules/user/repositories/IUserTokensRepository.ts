import UserToken from "../infra/typeorm/entities/UserToken";

interface ICreateUserTokenDTO {
  user_id: string;
  token: string;
  expires_at: Date;
}

interface IUserTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>;
}

export default IUserTokensRepository;
export { ICreateUserTokenDTO };
