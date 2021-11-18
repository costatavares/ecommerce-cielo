import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@database/database';
import { services } from './all-services';
import { controller } from './all-controllers';
import { CieloModule } from 'libs/cielo/src';
import { AuthModule } from 'libs/auth/src';
import { ListenersModule } from 'listeners/listeners';
import { RabbitmqModule } from '@rabbitmq/rabbitmq';
import { LogApiModule } from 'libs/log-api/src';

@Module({
  imports: [DatabaseModule, CieloModule, AuthModule, ListenersModule, RabbitmqModule,LogApiModule],
  controllers: [AppController, ...controller],
  providers: [AppService, ...services],
  exports:[DatabaseModule, ListenersModule, RabbitmqModule,LogApiModule]
})
export class AppModule {}
