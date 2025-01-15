import { Request, Response } from 'express';
import ListCustomersService from '../services/ListCustomersService';
import GetCustomerService from '../services/GetCustomerService';
import CreateCustomerService from '../services/CreateCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';

export default class CustomersController {
  public async listCustomers(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listCustomersService = new ListCustomersService();

    const result = await listCustomersService.execute();

    return response.json(result);
  }

  public async getCustomer(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getCustomerService = new GetCustomerService();

    const result = await getCustomerService.execute({ id });

    return response.json(result);
  }

  public async createCustomer(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, email } = request.body;

    const createCustomerService = new CreateCustomerService();

    const result = await createCustomerService.execute({
      name,
      email,
    });

    return response.json(result);
  }

  public async updateCustomer(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateCustomerService = new UpdateCustomerService();

    const result = await updateCustomerService.execute({
      id,
      name,
      email,
    });

    return response.json(result);
  }

  public async deleteCustomer(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteCustomerService = new DeleteCustomerService();

    await deleteCustomerService.execute({ id });

    return response.json([]);
  }
}
