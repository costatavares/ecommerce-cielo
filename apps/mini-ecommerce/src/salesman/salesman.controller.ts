import { SalesmanEntity, UserEntity } from '@database/database/entity';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateSalesmanDto } from 'apps/mini-ecommerce/dto/create-salesman.dto';
import { SalesmanService } from './salesman.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'libs/decorators/user.decorator';
import { SalesmanGuard } from 'libs/guards/salesman.guard';

@Controller('salesman')
@UseGuards(AuthGuard('jwt'), SalesmanGuard)
export class SalesmanController { 
  constructor(private readonly salesmanService: SalesmanService) { }

  @Get()
  async getAll(): Promise<SalesmanEntity[]>{
    return this.salesmanService.getAllSalesman();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<SalesmanEntity>{
    return this.salesmanService.getSalesmanById(id);
  }

  @Post()
  async create(@Body() salesman: CreateSalesmanDto[]): Promise<SalesmanEntity[]>{
    return this.salesmanService.createSalesman(salesman);
  }
}
