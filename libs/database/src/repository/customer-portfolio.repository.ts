import { CreateCustomerPortfolioDto } from "apps/mini-ecommerce/dto/create-customer-portfolio.dto";
import { EntityRepository, Repository } from "typeorm";
import { CustomerPortfolioEntity } from "../entity";

@EntityRepository(CustomerPortfolioEntity)
export class CustomerPortfolioRepository extends Repository<CustomerPortfolioEntity>{}