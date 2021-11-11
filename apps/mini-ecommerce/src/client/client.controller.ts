import { ClientEntity } from '@database/database/entity';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateClientDto } from 'apps/mini-ecommerce/dto/create-client.dto';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) { }

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
