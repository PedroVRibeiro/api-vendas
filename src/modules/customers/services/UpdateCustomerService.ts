import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
}

export default class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    if (email) {
      const alreadyRegisteredCustomer =
        await customersRepository.findByEmail(email);

      if (alreadyRegisteredCustomer && email !== customer.email) {
        throw new AppError('There is already one user with this email.');
      }

      customer.email = email;
    }

    if (name) {
      customer.name = name;
    }

    await customersRepository.save(customer);

    return customer;
  }
}
