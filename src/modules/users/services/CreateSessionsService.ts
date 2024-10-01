import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import { compare } from 'bcryptjs';

interface IRequest {
  email: string;
  password: string;
}

export default class CreateSessionsService {
  public async execute({
    email,
    password,
  }: IRequest): Promise<User | undefined> {
    let passwordConfirmed;

    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (user) {
      passwordConfirmed = await compare(password, user?.password);
    }

    if (!user || !passwordConfirmed) {
      throw new AppError('Incorrect email or password.', 401);
    }

    return user;
  }
}
