import { container } from "tsyringe";

import IHashProvider from "@modules/user/providers/HashProvider/models/IHashProvider";
import BcryptHashProvider from "@modules/user/providers/HashProvider/implementations/BcryptHashProvider";

// "Receita" para o TSyringe:
// Quando alguém pedir "HashProvider" (Contrato),
// entregue uma instância Singleton (única) de "BcryptHashProvider" (Implementação).
container.registerSingleton<IHashProvider>("HashProvider", BcryptHashProvider);
