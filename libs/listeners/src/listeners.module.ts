import { DatabaseModule } from '@database/database';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { events } from './events';
import { ListenersService } from './listeners.service';

@Module({
  imports:[EventEmitterModule.forRoot(), DatabaseModule],
  providers: [ListenersService, ... events],
  exports: [ListenersService, ...events],
})
export class ListenersModule {}
