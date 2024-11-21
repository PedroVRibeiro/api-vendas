import { Request, Response } from 'express';
import SendForgottenPasswordEmailService from '../services/SendForgottenPasswordEmailService';

export default class ForgotenPasswordController {
  public async sendForgottenPasswordEmail(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email } = request.body;

    const sendForgottenPasswordEmail = new SendForgottenPasswordEmailService();

    await sendForgottenPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}
