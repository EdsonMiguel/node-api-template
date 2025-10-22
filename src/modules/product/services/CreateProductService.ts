import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import Product from "../infra/typeorm/entities/Product";
import IProductRepository from "../repositories/IProductRepository";
import CreateProductDTO from "../dtos/CreateProductDTO";
import ICategoryRepository from "@modules/category/repositories/ICategoryRepository";

@injectable()
class CreateProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository,

    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  public async execute({
    name,
    price,
    category_id,
  }: CreateProductDTO): Promise<Product> {
    const checkProductExists = await this.productRepository.findByName(name);
    if (checkProductExists) {
      throw new AppError("Um produto com este nome já foi cadastrado.");
    }

    const categoryExists = await this.categoryRepository.findById(category_id);
    if (!categoryExists) {
      throw new AppError("A categoria informada não existe.", 404);
    }

    const product = await this.productRepository.create({
      name,
      price,
      category_id,
    });

    return product;
  }
}

export default CreateProductService;
