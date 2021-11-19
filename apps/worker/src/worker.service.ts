import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RabbitmqService } from '@rabbitmq/rabbitmq';
import { DataLogApiQueue } from 'libs/log-api/dto/data-log-api-queue.dto';
import { LogApiService } from 'libs/log-api/src';

@Injectable()
export class WorkerService implements OnModuleInit{
  private logger: Logger;
  constructor(
    private readonly rabbitmaq: RabbitmqService,
    private logApiService: LogApiService,
  ) {}
  
  async onModuleInit(): Promise<void> {
    await this.rabbitmaq.createConnection();
    await this.rabbitmaq.consume('ecommerce-cielo-log', async message =>
      await this.storageLogQueue(message),
    );   
  }

  async storageLogQueue(dataLog:any): Promise<void> {
    this.logger = new Logger('LogQueue');
    await this.logApiService.storageLog( this.logApiService.setDataLog(dataLog.content.toString()))
    this.logger.log({ method: 'storageLogQueue',content: dataLog.content.toString()});
    await this.rabbitmaq.channelAck(dataLog);
  }
  
  getHello(): string {
    return 'Hello World!';
  }

}
