import { Module } from '@nestjs/common';
import { CompanyCredentialController } from './company-credential.controller';
import { CompanyCredentialService } from './company-credential.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyCredential, CompanyCredentialSchema } from './schemas/ClientCredential.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyKeys } from './entity/company-credential.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CompanyCredential.name,
        schema: CompanyCredentialSchema,
      },
    ]),
    TypeOrmModule.forFeature([CompanyKeys])
  ],
  controllers: [CompanyCredentialController],
  providers: [CompanyCredentialService],
  exports: [CompanyCredentialService]
})
export class CompanyCredentialModule {}
