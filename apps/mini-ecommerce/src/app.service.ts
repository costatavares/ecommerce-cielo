import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitmqService } from '@rabbitmq/rabbitmq';
import { rabbiTransmissaoPublishQueue } from '@rabbitmq/rabbitmq/config/rabbit.conf';

@Injectable()
export class AppService implements OnModuleInit{
  constructor(
    private readonly rabbitmaq: RabbitmqService,    
  ) {}

  async onModuleInit() {
    await this.rabbitmaq.createConnection();
    await this.rabbitmaq.setPrefetch(1);
    await this.rabbitmaq.channelAssertQueue(rabbiTransmissaoPublishQueue);    
  }
  
  getHello(): string {
    return 'Hello World!';
  }
}
