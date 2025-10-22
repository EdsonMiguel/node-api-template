import { inject, injectable } from "tsyringe";
import ICategoryRepository from "../repositories/ICategoryRepository";
import CreateCategoryDTO from "../dtos/CreateCategoryDTO";
import Category from "../infra/typeorm/entities/Category";
import AppError from "@shared/errors/AppError";

@injectable()
class CreateCategoryService {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  public async execute({ name }: CreateCategoryDTO): Promise<Category> {
    const checkIfCategoryExists = await this.categoryRepository.findByName(
      name
    );

    if (checkIfCategoryExists) {
      throw new AppError("Já existe uma categoria com esse nome");
    }

    const category = await this.categoryRepository.create({ name });

    return category;
  }
}

export default CreateCategoryService;
