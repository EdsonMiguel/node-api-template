import CreateProductService from "@modules/product/services/CreateProductService";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import ShowProductService from "@modules/product/services/ShowProductService";
import ListProductsService from "@modules/product/services/ListProductsService";

class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, category_id } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      price,
      category_id,
    });

    return response.status(201).json(instanceToPlain(product));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showProduct = container.resolve(ShowProductService);
    const product = await showProduct.execute(id);

    return response.json(instanceToPlain(product));
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { page, limit, name, sortBy, order } = request.query;

    const options = {
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      name: name ? String(name) : undefined,
      sortBy: sortBy ? String(sortBy) : undefined,
      order: order
        ? (String(order).toUpperCase() as "ASC" | "DESC")
        : undefined,
    };

    const listProducts = container.resolve(ListProductsService);
    const [products, total] = await listProducts.execute(options);

    response.setHeader("X-Total-Count", total);
    response.setHeader("X-Page", options.page || 1);
    response.setHeader("X-Per-Page", options.limit || 10);

    return response.json(instanceToPlain(products));
  }
}

export default ProductsController;
