import { Test, TestingModule } from '@nestjs/testing';
import { CieloService } from './cielo.service';

describe('CieloService', () => {
  let service: CieloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CieloService],
    }).compile();

    service = module.get<CieloService>(CieloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
