import Category from "../infra/typeorm/entities/Category";
import CreateCategoryDTO from "../dtos/CreateCategoryDTO";

interface ICategoryRepository {
  create(data: CreateCategoryDTO): Promise<Category>;
  findByName(name: string): Promise<Category | undefined>;
  findById(id: string): Promise<Category | undefined>;
}

export default ICategoryRepository;
