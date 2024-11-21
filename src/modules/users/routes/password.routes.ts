import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgottenPasswordController from '../controllers/ForgottenPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgottenPasswordController = new ForgottenPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgotpass',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgottenPasswordController.sendForgottenPasswordEmail,
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.sendForgottenPasswordEmail,
);

export default passwordRouter;
