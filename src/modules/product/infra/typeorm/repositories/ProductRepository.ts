import IProductRepository from "@modules/product/repositories/IProductRepository";
import { ILike, Repository } from "typeorm";
import Product from "../entities/Product";
import { AppDataSource } from "@shared/infra/typeorm/datasource";
import CreateProductDTO from "@modules/product/dtos/CreateProductDTO";
import { IListProductsQueryDTO } from "@modules/product/dtos/IListProductsQueryDTO";
type ListProductsResponse = [Product[], number];

class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Product);
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({ where: { name } });
    return product || undefined;
  }

  public async create(data: CreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);
    await this.ormRepository.save(product);
    return product;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { id },
      relations: ["category"],
    });
    return product || undefined;
  }
  public async list({
    page,
    limit,
    name,
    sortBy,
    order,
  }: IListProductsQueryDTO): Promise<ListProductsResponse> {
    const take = limit || 10;
    const skip = ((page || 1) - 1) * take;

    const where = {};
    if (name) {
      Object.assign(where, { name: ILike(`%${name}%`) });
    }
    const sortField = sortBy || "created_at";
    const sortOrder = order || "DESC";

    const [products, total] = await this.ormRepository.findAndCount({
      where,
      order: { [sortField]: sortOrder },
      skip,
      take,
      relations: ["category"],
    });

    return [products, total];
  }
}

export default ProductRepository;
