import productRouter from '@modules/products/routes/product.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', usersRouter);
routes.use('/authenticate', sessionsRouter);

export default routes;
