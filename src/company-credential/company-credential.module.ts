import { Module } from '@nestjs/common';
import { CompanyCredentialController } from './company-credential.controller';
import { CompanyCredentialService } from './company-credential.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyCredential, CompanyCredentialSchema } from './schemas/ClientCredential.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CompanyCredential.name,
        schema: CompanyCredentialSchema,
      },
    ]),
  ],
  controllers: [CompanyCredentialController],
  providers: [CompanyCredentialService],
})
export class CompanyCredentialModule {}
