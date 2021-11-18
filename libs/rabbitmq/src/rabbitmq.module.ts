import { Module } from '@nestjs/common';
import { RabbitProvider } from './rabbit.provider';
import { RabbitmqService } from './rabbitmq.service';

@Module({
  providers: [RabbitmqService,  ...RabbitProvider],
  exports: [RabbitmqService,  ...RabbitProvider],
})
export class RabbitmqModule {}
