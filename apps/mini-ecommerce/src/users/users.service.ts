import { UserEntity } from '@database/database/entity';
import { UserRepository } from '@database/database/repository/user.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'apps/mini-ecommerce/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository
  ){}
  
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.getAllUsers();
  }
  
  async getUsersById(id: number): Promise<UserEntity> {
    return this.userRepository.getUsersById(id);
  }
  
  async createUsers(users: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.createUsers(users);
  }
      
}
