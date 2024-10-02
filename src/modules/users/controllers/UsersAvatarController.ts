import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

export default class UsersAvatarController {
  public async updateAvatar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    if (!request.file) {
      throw new AppError('File Not Found');
    }

    const user = updateAvatar.execute({
      userId: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.json(user);
  }
}
