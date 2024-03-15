import { Test, TestingModule } from '@nestjs/testing';
import { MicrositeController } from './microsite.controller';
import { MicrositeService } from './microsite.service';

describe('MicrositeController', () => {
  let controller: MicrositeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MicrositeController],
      providers: [MicrositeService],
    }).compile();

    controller = module.get<MicrositeController>(MicrositeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
