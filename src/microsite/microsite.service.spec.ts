import { Test, TestingModule } from '@nestjs/testing';
import { MicrositeService } from './microsite.service';

describe('MicrositeService', () => {
  let service: MicrositeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MicrositeService],
    }).compile();

    service = module.get<MicrositeService>(MicrositeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
