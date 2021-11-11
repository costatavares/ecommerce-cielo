import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@database/database';
import { services } from './all-services';
import { controller } from './all-controllers';
import { CieloModule } from 'libs/cielo/src';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';

@Module({
  imports: [DatabaseModule, CieloModule],
  controllers: [AppController, ...controller, UsersController],
  providers: [AppService, ...services],
})
export class AppModule {}
