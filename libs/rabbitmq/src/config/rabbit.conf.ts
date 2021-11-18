import { ConsoleLogger } from "@nestjs/common";

export const injectionListRabbitmaq = {
  rabbitConn: 'RABBIT_CONN_INJECT',
  rabbitTransmissaoChannel: 'RABBIT_TRANSMISSAO_CHANNEL',
  rabbitQueues: 'RABBIT_QUEUES',
}

export const rabbitHost = process.env.RABBITMQ_HOST_NAME || 'localhost'
export const rabbitAMQPPort = +process.env.RABBITMQ_AMQP_PORT! || 5672;
export const rabbitUser = process.env.RABBITMQ_USER || 'autocompara';
export const rabbitPassword = process.env.RABBITMQ_PASSWORD || 'autocompara';
export const rabbitPrefix = process.env.RABBITMQ_PREFIX;

export const rabbiTransmissaoPublishQueue = [
  process.env.ECOMMERCE_LOG_QUEUE_NAME, 
  process.env.ECOMMERCE_QUEUE_NAME,
];

