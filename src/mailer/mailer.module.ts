import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientCredential, ClientCredentialSchema } from 'src/client-credential/schemas/ClientCredential.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ClientCredential.name,
        schema: ClientCredentialSchema
      }
    ])
  ],
  providers: [MailerService],
  controllers: [MailerController]
})
export class MailerModule {}
