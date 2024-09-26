import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { celebrate, Joi, Segments } from 'celebrate';

const productRouter = Router();
const productController = new ProductController();

productRouter.get('/', productController.getAllProducts);

productRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productController.findProduct,
);

productRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2),
      quantity: Joi.number().required(),
    },
  }),
  productController.createProduct,
);

productRouter.put('/:id', productController.updateProduct);

productRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productController.deleteProduct,
);

export default productRouter;
