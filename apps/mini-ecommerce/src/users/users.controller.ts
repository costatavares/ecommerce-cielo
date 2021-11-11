import { UserEntity } from '@database/database/entity';
import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'apps/mini-ecommerce/dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAll(): Promise<UserEntity[]>{
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getById(@Param('id') id: number): Promise<UserEntity>{
    return this.usersService.getUsersById(id);
  }

  @Post()    
  async create(@Body() ursers: CreateUserDto): Promise<UserEntity>{
    return this.usersService.createUsers(ursers);
  }
}
