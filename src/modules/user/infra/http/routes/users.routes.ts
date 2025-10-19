import { Router } from "express";
import { validateRequest } from "@shared/infra/http/middlewares/validateRequest";
import CreateUserDTO from "@modules/user/dtos/CreateUserDTO";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import UsersController from "../controllers/UsersController";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  "/",
  ensureAuthenticated,
  validateRequest(CreateUserDTO),
  usersController.create
);

usersRouter.get("/profile", ensureAuthenticated, (request, response) => {
  const user = request.user;
  return response.json({ message: "Rota privada OK!", user });
});

export default usersRouter;
