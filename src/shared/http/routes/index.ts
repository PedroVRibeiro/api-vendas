import customersRouter from '@modules/customers/routes/customers.routes';
import productRouter from '@modules/products/routes/product.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', usersRouter);
routes.use('/authenticate', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/customers', customersRouter);

export default routes;
