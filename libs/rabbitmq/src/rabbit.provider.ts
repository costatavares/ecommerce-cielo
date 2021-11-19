import { Logger } from "@nestjs/common";
import { Channel, connect, Connection } from "amqplib";
import { rabbitHost, rabbitAMQPPort, rabbitUser, rabbitPassword, rabbiTransmissaoPublishQueue, injectionListRabbitmaq, rabbitPrefix } from "./config/rabbit.conf";
import { rabbitConnect } from "./config/rabbit.connect";


export const RabbitProvider = [
  {
    provide: injectionListRabbitmaq.rabbitConn,
    useFactory: async () => { return await createConnection() }
  },
  {
    provide: injectionListRabbitmaq.rabbitTransmissaoChannel,
    useFactory: async ( conn: Connection ) => { return await createTransmissaoChannel( conn ) },
    inject: [ injectionListRabbitmaq.rabbitConn ]
  },

  {
    provide: injectionListRabbitmaq.rabbitQueues,
    useFactory: async ( transmissaoPublishChannel: Channel, ) => { return await channelAssertQueue( transmissaoPublishChannel ) },
    inject: [ injectionListRabbitmaq.rabbitTransmissaoChannel ]
  }
]


async function createConnection(): Promise<Connection> {
  const logger = new Logger( 'RabbitMQ' );
  try {
    logger.debug( 'Tentando se conectar ao servidor do RabbitMQ...' );
    const connection = await connect(rabbitConnect);
    logger.log( 'RabbitMQ conectado.' );
    return connection;
  } catch ( err ) {
    logger.error( `Erro ao tentar se conectar ao RabbitMQ. ${err.message}  `, err );
    process.exit( -1 );
  }
}


async function createTransmissaoChannel ( conn: Connection ):Promise<Channel> {
  const logger = new Logger( 'RabbitMQ' );
  let transmissaoPublishChannel: Channel;

  try {
    logger.debug( 'Criando canal para enviar os eventos de transmissão...' );
    transmissaoPublishChannel = await conn.createChannel();
    transmissaoPublishChannel.on( 'close', () => {
      logger.warn( 'O canal de envio de transmissão foi fechado!' );
      setTimeout(createConnection, 1000);
      // process.exit( -1 );
    });

  } catch ( err ) {
    logger.error( `Erro ao criar o canal de envio de transmissão. ${err.message}`, err );
    process.exit( -1 );
  }
  
  return transmissaoPublishChannel;
}

async function  channelAssertQueue(transmissaoPublishChannel: Channel ):Promise<Channel> {
  const logger = new Logger( `AssertQueue`);
  try {
    rabbiTransmissaoPublishQueue.forEach(function(nome, i) {
      if( rabbitPrefix ) nome= `${rabbitPrefix}-${nome}`;
      logger.debug(`Amarrando o canal à fila: ${nome} ...` );
      // transmissaoPublishChannel.checkQueue(nome);      
      transmissaoPublishChannel.assertQueue( nome, { durable: true, autoDelete: true } );
      logger.log('Estrutura de publish pronta.' );
    });
    return transmissaoPublishChannel;
  
  } catch ( err ) {
    logger.error( `Erro ao amarrar o canal à fila de transmissão. ${err.message}`, err );
    process.exit( -1 );
  }
}
