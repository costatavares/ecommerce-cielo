import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '@database/database/config/ormconfig';
import { customRepositories, repositories } from './repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(config), 
    TypeOrmModule.forFeature(repositories)
  ],
  providers: [...customRepositories],
  exports: [TypeOrmModule.forFeature(repositories), ...customRepositories],
})
export class DatabaseModule {}
