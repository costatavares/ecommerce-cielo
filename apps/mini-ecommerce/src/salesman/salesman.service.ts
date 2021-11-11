import { SalesmanEntity } from '@database/database/entity';
import { SalesmanRepository } from '@database/database/repository/salesman.repository';
import { Injectable } from '@nestjs/common';
import { CreateSalesmanDto } from 'apps/mini-ecommerce/dto/create-salesman.dto';

@Injectable()
export class SalesmanService {
    constructor(
        private readonly salesmanRepository: SalesmanRepository
    ){}
    
    async getAllSalesman(): Promise<SalesmanEntity[]> {
        return this.salesmanRepository.getAllSalesman();
    }
    
    async getSalesmanById(id: number): Promise<SalesmanEntity> {
        return this.salesmanRepository.getSalesmanById(id);
    }
    
    async createSalesman(Salesman: CreateSalesmanDto[]): Promise<SalesmanEntity[]> {
        return this.salesmanRepository.createSalesman(Salesman);
    }
}
