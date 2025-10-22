import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import Product from "../infra/typeorm/entities/Product";
import IProductRepository from "../repositories/IProductRepository";

@injectable()
class ShowProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  public async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError("Produto não encontrado.", 404);
    }

    return product;
  }
}

export default ShowProductService;
