import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UserEntity } from '../entity';
import { CreateUserDto } from 'apps/mini-ecommerce/dto/create-user.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  
  async getAllUsers(): Promise<UserEntity[]> {
    return this.find({order: { id: 'DESC' }});
  }

  async getUsersById(id: number): Promise<UserEntity> {
    const userEntity =  await this.findOne(id);
    
    if (!userEntity){
      throw new NotFoundException(`User with id ${id} doesnt exists`);
    }

    return userEntity;    
  }

  async createUsers(users: CreateUserDto ): Promise<UserEntity> {
    const userEntity = this.create(users);
    return this.save(userEntity);
  } 
}
