import CreateProductDTO from "../dtos/CreateProductDTO";
import { IListProductsQueryDTO } from "../dtos/IListProductsQueryDTO";
import Product from "../infra/typeorm/entities/Product";

type ListProductsResponse = [Product[], number];

interface IProductRepository {
  create(data: CreateProductDTO): Promise<Product>;
  findByName(name: string): Promise<Product | undefined>;
  findById(id: string): Promise<Product | undefined>;
  list(options: IListProductsQueryDTO): Promise<ListProductsResponse>;
}
export default IProductRepository;
