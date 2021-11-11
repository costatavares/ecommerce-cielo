import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Role } from './enum/role.enum';

@Injectable()
export class ClinetGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // return user.type == Role.CLIENTE ?? this.getError();
    if (user.type == Role.CLIENTE) {
      return true;
    }
    this.getError();
    // throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }

  getError(){
    throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }

   
}