import { Module } from '@nestjs/common';
import { LogApiService } from './log-api.service';

@Module({
  providers: [LogApiService],
  exports: [LogApiService],
})
export class LogApiModule {}
