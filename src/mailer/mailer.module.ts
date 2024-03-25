import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyCredential, CompanyCredentialSchema } from 'src/company-credential/schemas/ClientCredential.schema';
import { CompanyCredentialModule } from 'src/company-credential/company-credential.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CompanyCredential.name,
        schema: CompanyCredentialSchema
      }
    ]),
    CompanyCredentialModule
  ],
  providers: [MailerService],
  controllers: [MailerController]
})
export class MailerModule {}
