import { ClientEntity } from '@database/database/entity';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateClientDto } from 'apps/mini-ecommerce/dto/create-client.dto';
import { ClientService } from './client.service';
import { AuthGuard } from '@nestjs/passport';
import { ClinetGuard } from 'libs/guards/client.guard';
import { RabbitmqService } from '@rabbitmq/rabbitmq';

@Controller('client')
@UseGuards(AuthGuard('jwt'),ClinetGuard)
export class ClientController {
  constructor(
    private readonly clientService: ClientService, 
    private readonly rabbitmaq: RabbitmqService,
  ){ }

  @Get()
  async getAll(): Promise<ClientEntity[]>{
    return this.clientService.getAllClient();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<ClientEntity>{
    return this.clientService.getClientById(id);
  }

  @Post()
  async create(@Body() client: CreateClientDto[]): Promise<ClientEntity[]>{
    return this.clientService.createClient(client);
  }
}
