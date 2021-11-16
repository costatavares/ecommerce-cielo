import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@database/database';
import { services } from './all-services';
import { controller } from './all-controllers';
import { CieloModule } from 'libs/cielo/src';
import { AuthModule } from 'libs/auth/src';
import { ListenersModule } from 'listeners/listeners';

@Module({
  imports: [DatabaseModule, CieloModule, AuthModule, ListenersModule],
  controllers: [AppController, ...controller],
  providers: [AppService, ...services],
  exports:[DatabaseModule, ListenersModule]
})
export class AppModule {}
