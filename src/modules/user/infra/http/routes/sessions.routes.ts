import { Router } from "express";
import { validateRequest } from "@shared/infra/http/middlewares/validateRequest";
import CreateSessionDTO from "@modules/user/dtos/CreateSessionDTO";
import SessionsController from "../controllers/SessionsController";

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  "/",
  validateRequest(CreateSessionDTO),
  sessionsController.create
);

export default sessionsRouter;
