import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import UsersAvatarController from '../controllers/UsersAvatarController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

const multerUpload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, usersController.getAllUsers);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.createUser,
);

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  multerUpload.single('avatar'),
  usersAvatarController.updateAvatar,
);

export default usersRouter;
