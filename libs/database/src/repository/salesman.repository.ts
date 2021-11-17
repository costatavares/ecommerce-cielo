import { NotFoundException } from "@nestjs/common";
import { CreateSalesmanDto } from "apps/mini-ecommerce/dto/create-salesman.dto";
import { EntityRepository, Repository } from "typeorm";
import { SalesmanEntity } from "../entity";

@EntityRepository(SalesmanEntity)
export class SalesmanRepository extends Repository<SalesmanEntity> {
    
  async getAllSalesman(): Promise<SalesmanEntity[]> {
    return this.find();
  }

  async getSalesmanById(id: number): Promise<SalesmanEntity> {
    const SalesmanEntity = await this.findOne(id, {
      relations: ['payment','customerPortfolio'],
    });

    if (!SalesmanEntity){
      throw new NotFoundException(`Salesman with id ${id} doesnt exists`);
    }
    return SalesmanEntity;
  }

  async createSalesman(Salesman: CreateSalesmanDto ): Promise<SalesmanEntity> {
    const SalesmanEntity = this.create(Salesman);
    return this.save(SalesmanEntity);
  }
}
