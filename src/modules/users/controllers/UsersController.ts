import { Request, Response } from 'express';
import ListUsersService from '../services/ListUsersService';
import CreateUserService from '../services/CreateUserService';
import GetUserService from '../services/GetUserService';
import UpdateUserService from '../services/UpdateUserService';

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

  public async getUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const getUserService = new GetUserService();
    const user_id = request.user.id;

    const user = await getUserService.execute({ user_id });

    return response.json(user);
  }

  public async updateUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateUserService = new UpdateUserService();
    const user_id = request.user.id;

    const { name, email, password, old_password } = request.body;

    const user = await updateUserService.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(user);
  }
}
