import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  user_id: string;
  name?: string;
  email?: string;
  password?: string;
  old_password?: string;
}

export default class UpdateUserService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (email) {
      const alreadyRegisteredUser = await usersRepository.findByEmail(email);

      if (alreadyRegisteredUser && alreadyRegisteredUser.id !== user.id) {
        throw new AppError('There is already one user with this email.');
      }

      user.email = email;
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await hash(password, 8);
    }

    if (name) {
      user.name = name;
    }

    await usersRepository.save(user);

    return user;
  }
}
