import UserToken from "../infra/typeorm/entities/UserToken";

// DTO para os dados de criação
interface ICreateUserTokenDTO {
  user_id: string;
  token: string;
  expires_at: Date;
}

interface IUserTokensRepository {
  // Método para criar e salvar o refresh token
  create(data: ICreateUserTokenDTO): Promise<UserToken>;

  // (Vamos precisar destes em breve)
  // findByToken(token: string): Promise<UserToken | undefined>;
  // deleteById(id: string): Promise<void>;
}

export default IUserTokensRepository;
export { ICreateUserTokenDTO }; // Exporta o DTO também
