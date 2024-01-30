import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientCredential } from 'src/client-credential/models/clientCredential.interface';
import { ClientCredentialSchema } from 'src/client-credential/schemas/ClientCredential.schema';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: ClientCredential.name,
        schema: ClientCredentialSchema
      }
    ]),
  ],
})
export class AuthModule {}
