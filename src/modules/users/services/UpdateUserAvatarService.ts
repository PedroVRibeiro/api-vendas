import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }

    //Remove um avatar, caso já exista
    if (user.avatar) {
      //Une os caminhos dos arquivos
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      //Usa o filesystem para OBTER O STATUS do arquivo no caminho fornecido
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      //Usa o filesystem para REMOVER o arquivo no caminho fornecido
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}
