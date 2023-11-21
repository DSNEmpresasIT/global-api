import { Test, TestingModule } from '@nestjs/testing';
import { ClientCredentialController } from './client-credential.controller';

describe('ClientCredentialController', () => {
  let controller: ClientCredentialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientCredentialController],
    }).compile();

    controller = module.get<ClientCredentialController>(
      ClientCredentialController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
