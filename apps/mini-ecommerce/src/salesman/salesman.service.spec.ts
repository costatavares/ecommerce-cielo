import { Test, TestingModule } from '@nestjs/testing';
import { SalesmanService } from './salesman.service';

describe('SalesmanService', () => {
  let service: SalesmanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesmanService],
    }).compile();

    service = module.get<SalesmanService>(SalesmanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
