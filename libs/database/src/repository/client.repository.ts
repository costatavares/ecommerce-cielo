import { NotFoundException } from '@nestjs/common';
import { CreateClientDto } from 'apps/mini-ecommerce/dto/create-client.dto';
import { EntityRepository, Repository } from 'typeorm';
import { ClientEntity } from '../entity';

@EntityRepository(ClientEntity)
export class ClientRepository extends Repository<ClientEntity> {
    
    async getAllClient(): Promise<ClientEntity[]> {
        return this.find();
    }

    async getClientById(id: number): Promise<ClientEntity> {
        const clientEntity = await this.findOne(id, {
            relations: ['payment'],
        });
    
        if (!clientEntity)
          throw new NotFoundException(`Client with id ${id} doesnt exists`);
        return clientEntity;
    }

    async createClient(client: CreateClientDto[] ): Promise<ClientEntity[]> {
        const clientEntity = this.create(client);
        return this.save(clientEntity);
    }
}