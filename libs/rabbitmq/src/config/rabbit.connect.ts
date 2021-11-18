import { rabbitAMQPPort, rabbitHost, rabbitPassword, rabbitUser } from "./rabbit.conf";

export const rabbitConnect = {
  hostname: rabbitHost,
  locale: 'pt-br',
  port: rabbitAMQPPort,
  username: rabbitUser,
  password: rabbitPassword
}