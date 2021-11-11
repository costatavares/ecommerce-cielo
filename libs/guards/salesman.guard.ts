import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Role } from './enum/role.enum';

@Injectable()
export class SalesmanGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
        
    if (user.type == Role.SALESMAN) {
      return true;
    }
    
    this.getError();    
  }

  getError(){
    throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }
}