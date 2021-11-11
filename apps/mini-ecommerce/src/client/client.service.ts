import { ClientEntity } from '@database/database/entity';
import { ClientRepository } from '@database/database/repository/client.repository';
import { Injectable } from '@nestjs/common';
import { CreateClientDto } from 'apps/mini-ecommerce/dto/create-client.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
    constructor(
        private readonly clientRepository: ClientRepository
    ){}
    
    async getAllClient(): Promise<ClientEntity[]> {
        return this.clientRepository.getAllClient();
    }
    
    async getClientById(id: number): Promise<ClientEntity> {
        return this.clientRepository.getClientById(id);
    }
    
    async createClient(client: CreateClientDto[]): Promise<ClientEntity[]> {
        return this.clientRepository.createClient(client);
    }
}
