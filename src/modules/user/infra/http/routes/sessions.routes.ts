import { Router } from "express";

import { validateRequest } from "@shared/infra/http/middlewares/validateRequest"; // 1. IMPORTE
import CreateSessionDTO from "@modules/user/dtos/CreateSessionDTO"; // 2. IMPORTE O DTO

import SessionsController from "../controllers/SessionsController";

const sessionsRouter = Router();
const sessionsController = new SessionsController();

// 3. PLUGUE O MIDDLEWARE NA ROTA
sessionsRouter.post(
  "/",
  validateRequest(CreateSessionDTO), // <-- VALIDAÇÃO AQUI
  sessionsController.create
);

export default sessionsRouter;
