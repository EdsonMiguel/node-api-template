import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm/datasource";

import Category from "../entities/Category";
import CreateCategoryDTO from "@modules/category/dtos/CreateCategoryDTO";
import ICategoryRepository from "@modules/category/repositories/ICategoryRepository";

@injectable()
class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Category);
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({ where: { name } });
    return category || undefined;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({ where: { id } });
    return category || undefined;
  }

  public async create(data: CreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create(data);
    await this.ormRepository.save(category);
    return category;
  }
}

export default CategoryRepository;
