import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyCredential } from 'src/company-credential/models/CompanyCredential.interface';
import { CompanyCredentialSchema } from 'src/company-credential/schemas/ClientCredential.schema';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: CompanyCredential.name,
        schema: CompanyCredentialSchema
      }
    ]),
  ],
})
export class AuthModule {}
