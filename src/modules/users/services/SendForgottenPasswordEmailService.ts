import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UsersTokensRepository from '../typeorm/repositories/UsersTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';

//only enable this for DEV, to bypass 'self signed certificate' error!!!
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

interface IRequest {
  email: string;
}

export default class SendForgottenPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UsersTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    const { token } = await userTokensRepository.generateToken(user.id);

    try {
      await EtherealMail.sendMail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: '[Email Teste] - Recuperação de senha',
        templateData: {
          template: `Solicitação de redefinição de senha enviada por {{name}}: ${JSON.stringify(token)}`,
          variables: {
            name: user.name,
            token,
          },
        },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}
