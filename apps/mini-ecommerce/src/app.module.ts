import { SalesmanController } from './salesman/salesman.controller';
import { ClientController } from './client/client.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@database/database';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseProviders } from '@database/database/database.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SalesmanController, ClientController, AppController],
  providers: [AppService],
})
export class AppModule {}
