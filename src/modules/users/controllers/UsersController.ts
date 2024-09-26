import { Request, Response } from 'express';
import ListUsersService from '../services/ListUsersService';
import CreateUserService from '../services/CreateUserService';

export default class UsersController {
  public async getAllUsers(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listUsersService = new ListUsersService();

    const result = await listUsersService.execute();

    return response.json(result);
  }

  public async createUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const result = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.json(result);
  }
}
