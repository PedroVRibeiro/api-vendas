/* eslint-disable no-console */
import nodemailer from 'nodemailer';
import {
  IParseMailTemplate,
  HandlebarsMailTemplate,
} from './HandlebarsMailTemplate';

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const { smtp, user, pass } = await nodemailer.createTestAccount();

    const mailTemplate = new HandlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: {
        user: user,
        pass: pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Nome padrão de remetente',
        address: from?.email || 'emailteste@teste.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
