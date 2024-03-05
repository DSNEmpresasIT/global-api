import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyCredential, CompanyCredentialSchema } from 'src/company-credential/schemas/ClientCredential.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CompanyCredential.name,
        schema: CompanyCredentialSchema
      }
    ])
  ],
  providers: [MailerService],
  controllers: [MailerController]
})
export class MailerModule {}
