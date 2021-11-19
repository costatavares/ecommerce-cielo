import { DatabaseModule } from '@database/database';
import { Module } from '@nestjs/common';
import { LogApiService } from './log-api.service';

@Module({
  imports: [ DatabaseModule],
  providers: [LogApiService],
  exports: [LogApiService,DatabaseModule],
})
export class LogApiModule {}
