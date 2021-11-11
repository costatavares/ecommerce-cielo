import { ClientRepository } from './client.repository';
import { PaymentRepository } from './payment.repository';
import { SalesmanRepository } from './salesman.repository';
import { UserRepository } from './user.repository';

//add here all repositories for orm.
export const repositories = [
    UserRepository,
    ClientRepository,
    SalesmanRepository,
    PaymentRepository,
];

export const customRepositories = [];
