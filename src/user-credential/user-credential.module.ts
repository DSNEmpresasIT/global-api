import { Module } from '@nestjs/common';
import { UserCredentialController } from './user-credential.controller';
import { UserCredentialService } from './user-credential.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserCredential,
  UserCredentialSchema,
} from './schemas/UserCredential.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserCredential.name,
        schema: UserCredentialSchema,
      },
    ]),
  ],
  controllers: [UserCredentialController],
  providers: [UserCredentialService],
})
export class UserCredentialModule {}
