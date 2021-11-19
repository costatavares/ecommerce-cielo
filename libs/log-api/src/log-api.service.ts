import { LogRepository } from '@database/database/repository/log.repository';
import { Injectable } from '@nestjs/common';
import { BodyRequestLogDto } from '../dto/body-request-log';
import { DataLogApiDto } from '../dto/data-log-api.dto';

@Injectable()
export class LogApiService {
  
  constructor(
    private readonly logRespository: LogRepository,    
  ){}

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

  setDataLog(dataLog: string): DataLogApiDto {
    return {
      log: dataLog 
    }
  }

  async storageLog(data: object): Promise<void>{
    const entityCreate = this.logRespository.create(data);
    this.logRespository.save(entityCreate);
  }
}
