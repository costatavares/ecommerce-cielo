import { Inject, Injectable } from '@nestjs/common';
import { Channel } from 'amqplib';
import { injectionListRabbitmaq } from './config/rabbit.conf';

@Injectable()
export class RabbitmqService {
  constructor(
    @Inject( injectionListRabbitmaq.rabbitQueues )
    private readonly rabbitQueues: Channel,
  ){}

  async sendToQueue(queue: string, payload, persistent = true ){
    this.rabbitQueues.sendToQueue( queue, Buffer.from( JSON.stringify( payload ) ), { persistent: persistent } );
  }  
  
}
