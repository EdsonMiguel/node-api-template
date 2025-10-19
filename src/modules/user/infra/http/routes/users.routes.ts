import { Router } from "express";

// --- Validação ---
import { validateRequest } from "@shared/infra/http/middlewares/validateRequest";
import CreateUserDTO from "@modules/user/dtos/CreateUserDTO";

// --- Autenticação ---
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

// --- Controller ---
import UsersController from "../controllers/UsersController";

const usersRouter = Router();
const usersController = new UsersController();

// --- Rota PÚBLICA (com validação) ---
// Rota para criar um novo usuário
usersRouter.post(
  "/",
  ensureAuthenticated,
  validateRequest(CreateUserDTO), // 1. Valida o body
  usersController.create // 2. Chama o controller
);

// --- Rota PRIVADA (com autorização) ---
// Rota de teste para checar se o token funciona
usersRouter.get(
  "/profile",
  ensureAuthenticated, // 1. Passa pelo "Guarda" (exige token)
  (request, response) => {
    // 2. Se passou, o request.user existe
    const user = request.user;
    return response.json({ message: "Rota privada OK!", user });
  }
);

export default usersRouter;
