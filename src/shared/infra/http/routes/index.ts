import { Router } from "express";

const routes = Router();

// Rota de "Health Check" (Verificação de Saúde)
routes.get("/", (request, response) => {
  return response.json({ message: "API Template (v0.3) is running!" });
});

// Em breve: routes.use('/users', usersRouter);

export default routes;
