import { Router } from "express";
import usersRouter from "@modules/user/infra/http/routes/users.routes";
import sessionsRouter from "@modules/user/infra/http/routes/sessions.routes"; // 1. IMPORTE

const routes = Router();

routes.get("/", (request, response) => {
  return response.json({ message: "API Template (v0.3) is running!" });
});

// Rotas de Usuário
routes.use("/users", usersRouter);

// Rotas de Sessão (Login)
routes.use("/sessions", sessionsRouter); // 2. USE

export default routes;
