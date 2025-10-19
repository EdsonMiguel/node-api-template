interface IHashProvider {
  // Recebe a senha pura (plain text) e retorna o hash
  generateHash(payload: string): Promise<string>;

  // Recebe a senha pura e o hash salvo no banco, e retorna se batem
  compareHash(payload: string, hashed: string): Promise<boolean>;
}

export default IHashProvider;
