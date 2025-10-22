import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";

import CreateCategoryService from "@modules/category/services/CreateCategoryService";

class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = container.resolve(CreateCategoryService);
    const category = await createCategory.execute({ name });

    return response.status(201).json(instanceToPlain(category));
  }
}

export default CategoriesController;
