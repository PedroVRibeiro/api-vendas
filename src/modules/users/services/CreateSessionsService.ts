import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export default class CreateSessionsService {
  public async execute({
    email,
    password,
  }: IRequest): Promise<IResponse | undefined> {
    let passwordConfirmed;

    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (user) {
      passwordConfirmed = await compare(password, user?.password);
    }

    if (!user || !passwordConfirmed) {
      throw new AppError('Incorrect email or password.', 401);
    }

    const token = sign({}, '47ff3fe29f91e072a1c97a231f92d083', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}
