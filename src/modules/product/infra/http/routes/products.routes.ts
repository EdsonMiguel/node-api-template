import { Router } from "express";
import { validateRequest } from "@shared/infra/http/middlewares/validateRequest";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import CreateProductDTO from "@modules/product/dtos/CreateProductDTO";
import ProductController from "../controllers/ProductController";

const productsRouter = Router();
const productsController = new ProductController();

productsRouter.post(
  "/",
  ensureAuthenticated,
  validateRequest(CreateProductDTO),
  productsController.create
);

productsRouter.get("/:id", ensureAuthenticated, productsController.show);

productsRouter.get("/", ensureAuthenticated, productsController.list);

export default productsRouter;
