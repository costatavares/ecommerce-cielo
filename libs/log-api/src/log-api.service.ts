import { Injectable } from '@nestjs/common';
import { BodyRequestLogDto } from '../dto/body-request-log';

@Injectable()
export class LogApiService {

  setBodyRequestLog(request: any): BodyRequestLogDto {
    return{
      type: request.user.type,
      headers: request.headers,
      method: request.method,
      url: request.url,
      timestamp: new Date(),
      body: request.body,
    }
  }
}
