import { Router } from "express";
import usersRouter from "@modules/user/infra/http/routes/users.routes";
import sessionsRouter from "@modules/user/infra/http/routes/sessions.routes";
import productsRouter from "@modules/product/infra/http/routes/products.routes";
import categoriesRouter from "@modules/category/infra/http/routes/categories.routes";

const routes = Router();

routes.get("/", (request, response) => {
  return response.json({ message: "API Template (v0.3) is running!" });
});

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/products", productsRouter);
routes.use("/categories", categoriesRouter);

export default routes;
