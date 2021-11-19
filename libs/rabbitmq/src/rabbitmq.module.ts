import { Module } from '@nestjs/common';
import { RabbitProvider } from './rabbit.provider';
import { RabbitmqService } from './rabbitmq.service';

@Module({
  providers: [RabbitmqService],
  exports: [RabbitmqService,],
})
export class RabbitmqModule {}
