import { Module } from '@nestjs/common';
import { CieloService } from './cielo.service';
import {HttpModule} from '@nestjs/axios'; 
import { DatabaseModule } from '@database/database';

@Module({
  imports: [HttpModule, DatabaseModule],
  providers: [CieloService],
  exports: [CieloService],
})
export class CieloModule {}
