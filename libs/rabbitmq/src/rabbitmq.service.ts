import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Channel, connect, Connection, Message } from 'amqplib';
import { injectionListRabbitmaq, rabbitPrefix, rabbiTransmissaoPublishQueue } from './config/rabbit.conf';
import { rabbitConnect } from './config/rabbit.connect';

@Injectable()
export class RabbitmqService {
  private connection: Connection;
  private channel: Channel;
  private logger: Logger;

  constructor(){
    this.logger = new Logger('RabbitMQ');
  }

  async createConnection() {
    
    try {
      this.logger.debug( 'Tentando se conectar ao servidor do RabbitMQ...' );
      this.connection = await connect(rabbitConnect);
      this.connection.on("close", function() {
        console.error("[AMQP] reconnecting");
        return setTimeout(this.createConnection, 1000);
      });
      this.logger.log( 'RabbitMQ conectado.' );
      this.channel = await this.createTransmissaoChannel();      
    } catch ( err ) {
      this.logger.error( `Erro ao tentar se conectar ao RabbitMQ. ${err.message}  `, err );
      process.exit( -1 );
    }
  }

  async createTransmissaoChannel(): Promise<Channel> {
    const logger = new Logger( 'RabbitMQ' );    
    try {
      logger.debug( 'Criando canal para enviar os eventos de transmissão...' );
      const channel = await this.connection.createChannel();
      channel.on( 'close', () => {
        logger.warn( 'O canal de envio de transmissão foi fechado!' );
        process.exit( -1 );
      })
      logger.log( 'Canal criado.');
      return channel;
    } catch ( err ) {
      logger.error( `Erro ao criar o canal de envio de transmissão. ${err.message}`, err );
      process.exit( -1 );
    }
  }

  async setPrefetch(count: number){
    this.channel.prefetch(count);
  }

  async sendToQueue(queue: string, payload: any, persistent = true ){
    this.channel.sendToQueue( queue, Buffer.from( JSON.stringify( payload ) ), { persistent: persistent } );
  }

  async publish(exchange: string, routinKey: string, content: any ){
    this.channel.publish( exchange, routinKey,  Buffer.from( JSON.stringify( content ) ));
  }

  async consume(queue: string, callback: (message: Message) => void) {
    return this.channel.consume(queue, (message) => {
      callback(message);
      
    });   
  }

  async channelAck(message){
    this.channel.ack(message);
  }

  async channelAssertQueue(queues: string[]) {
    const logger = this.logger;
    let rabbitQueues = this.channel;
    try {
      queues.forEach(async function(nome, i) {
        if( rabbitPrefix ) nome= `${rabbitPrefix}-${nome}`;
        logger.debug(`Amarrando o canal à fila: ${nome} ...` );
        rabbitQueues.assertQueue( nome, { durable: true} );
        logger.log('Estrutura de publish pronta.' );
      });
      this.channel = rabbitQueues;
      return this.channel;
    
    } catch ( err ) {
      logger.error( `Erro ao amarrar o canal à fila de transmissão. ${err.message}`, err );
      process.exit( -1 );
    }
  }
}
