import { DatabaseModule } from '@database/database';
import { Module } from '@nestjs/common';
import { RabbitmqModule, RabbitmqService } from '@rabbitmq/rabbitmq';
import { RabbitProvider } from '@rabbitmq/rabbitmq/rabbit.provider';
import { LogApiModule } from 'libs/log-api/src';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';

console.log(DatabaseModule);
@Module({
  imports: [DatabaseModule, RabbitmqModule,LogApiModule],
  controllers: [WorkerController],
  providers: [WorkerService],
  exports: [RabbitmqModule,DatabaseModule,LogApiModule]
})
export class WorkerModule {}
