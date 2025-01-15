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

usersRouter.use(isAuthenticated);

usersRouter.get('/', usersController.getAllUsers);

usersRouter.get('/logged-user', usersController.getUser);

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

usersRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
      old_password: Joi.string(),
    },
  }),
  usersController.updateUser,
);

usersRouter.patch(
  '/avatar',
  multerUpload.single('avatar'),
  usersAvatarController.updateAvatar,
);

export default usersRouter;
