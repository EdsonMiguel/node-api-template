import { Router } from "express";
import { validateRequest } from "@shared/infra/http/middlewares/validateRequest";

import CreateCategoryDTO from "@modules/category/dtos/CreateCategoryDTO";
import CategoriesController from "../controllers/CategoriesController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.post(
  "/",
  ensureAuthenticated,
  validateRequest(CreateCategoryDTO), 
  categoriesController.create
);

export default categoriesRouter;
