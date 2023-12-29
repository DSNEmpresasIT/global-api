import { Module } from '@nestjs/common';
import { ClientCredentialController } from './client-credential.controller';
import { ClientCredentialService } from './client-credential.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ClientCredential,
  ClientCredentialSchema,
} from './schemas/ClientCredential.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ClientCredential.name,
        schema: ClientCredentialSchema,
      },
    ]),
  ],
  controllers: [ClientCredentialController],
  providers: [ClientCredentialService],
})
export class ClientCredentialModule {}
