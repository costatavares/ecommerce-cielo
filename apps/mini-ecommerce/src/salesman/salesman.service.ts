import { SalesmanEntity } from '@database/database/entity';
import { SalesmanRepository } from '@database/database/repository/salesman.repository';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateSalesmanDto } from 'apps/mini-ecommerce/dto/create-salesman.dto';

@Injectable()
export class SalesmanService {
  constructor(
    private readonly salesmanRepository: SalesmanRepository,
    private eventEmitter: EventEmitter2,
  ){}
  
  async getAllSalesman(): Promise<SalesmanEntity[]> {
    return this.salesmanRepository.getAllSalesman();
  }
  
  async getSalesmanById(id: number): Promise<SalesmanEntity> {
    return this.salesmanRepository.getSalesmanById(id);
  }
  
  async createSalesman(Salesman: CreateSalesmanDto): Promise<SalesmanEntity> {
    const salesmanEntity = await this.salesmanRepository.createSalesman(Salesman);
    const eventCustomerPortfolioCreate = { id_salesman: salesmanEntity.id };
    this.eventEmitter.emit('customerPortfolio.create', eventCustomerPortfolioCreate);
    return salesmanEntity;
  }
}
