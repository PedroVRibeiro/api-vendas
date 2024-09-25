import { Request, Response } from 'express';
import ListProductsService from '../services/ListProductsService';
import FindProductService from '../services/FindProductService';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';

export default class ProductController {
  public async getAllProducts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listProductsService = new ListProductsService();

    const result = await listProductsService.execute();

    return response.json(result);
  }

  public async findProduct(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const findProductService = new FindProductService();

    const result = await findProductService.execute({ id });

    return response.json(result);
  }

  public async createProduct(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProductService = new CreateProductService();

    const result = await createProductService.execute({
      name,
      price,
      quantity,
    });

    return response.json(result);
  }

  public async updateProduct(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProductService = new UpdateProductService();

    const result = await updateProductService.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(result);
  }

  public async deleteProduct(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteProductService = new DeleteProductService();

    await deleteProductService.execute({ id });

    return response.json([]);
  }
}
