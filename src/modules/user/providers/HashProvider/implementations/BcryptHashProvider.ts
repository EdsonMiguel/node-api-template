import { hash, compare } from "bcryptjs";
import IHashProvider from "../models/IHashProvider";

class BcryptHashProvider implements IHashProvider {
  // Implementa o contrato "generateHash"
  public async generateHash(payload: string): Promise<string> {
    // O "8" é o 'salt rounds' (custo da criptografia)
    return hash(payload, 8);
  }

  // Implementa o contrato "compareHash"
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BcryptHashProvider;
