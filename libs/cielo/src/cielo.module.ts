import { Module } from '@nestjs/common';
import { CieloService } from './cielo.service';
import {HttpModule} from '@nestjs/axios'; 

@Module({
  imports: [HttpModule],
  providers: [CieloService],
  exports: [CieloService],
})
export class CieloModule {}
