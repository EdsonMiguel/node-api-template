import { injectable, inject } from "tsyringe";
import Product from "../infra/typeorm/entities/Product";
import IProductRepository from "../repositories/IProductRepository";
import { IListProductsQueryDTO } from "../dtos/IListProductsQueryDTO";

type ListProductsResponse = [Product[], number];

@injectable()
class ListProductsService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  public async execute(
    options: IListProductsQueryDTO
  ): Promise<ListProductsResponse> {
    const [products, total] = await this.productRepository.list(options);
    return [products, total];
  }
}

export default ListProductsService;
