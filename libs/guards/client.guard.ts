import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RabbitmqService } from '@rabbitmq/rabbitmq';
import { rabbiTransmissaoPublishQueue } from '@rabbitmq/rabbitmq/config/rabbit.conf';
import { LogApiService } from 'libs/log-api/src';
import { Role } from './enum/role.enum';

@Injectable()
export class ClinetGuard implements CanActivate {
  constructor(
    private readonly rabbitmaq: RabbitmqService,
    private readonly logapi: LogApiService,
  ) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (user.type == Role.CLIENTE) {
      this.sendLogQueue(request);
      return true;
    }
    this.getError();
  }

  getError(){
    throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }

  private sendLogQueue(request){
    this.rabbitmaq.sendToQueue(rabbiTransmissaoPublishQueue[0],this.logapi.setBodyRequestLog(request));
  }
  
}