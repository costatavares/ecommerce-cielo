import { ClientRepository } from './client.repository';
import { CustomerPortfolioRepository } from './customer-portfolio.repository';
import { LogRepository } from './log.repository';
import { PaymentRepository } from './payment.repository';
import { SalesmanRepository } from './salesman.repository';
import { TransactionRepository } from './transaction.repository';
import { UserRepository } from './user.repository';

//add here all repositories for orm.
export const repositories = [
  UserRepository,
  ClientRepository,
  SalesmanRepository,
  PaymentRepository,
  CustomerPortfolioRepository,
  TransactionRepository,
  LogRepository,
];

export const customRepositories = [];
