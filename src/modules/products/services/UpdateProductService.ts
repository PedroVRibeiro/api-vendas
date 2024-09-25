import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productWithSameName = await productsRepository.findByName(name);

    // deve impedir a atualização com um nome de outro produto já existente, mas permitir caso seja do próprio produto
    if (productWithSameName && name !== product.name) {
      throw new AppError('There is already a product with the supplied name');
    }

    await productsRepository.save({
      id: id,
      name,
      price,
      quantity,
    });

    return product;
  }
}
