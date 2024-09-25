import productRouter from '@modules/products/routes/product.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productRouter);

export default routes;
