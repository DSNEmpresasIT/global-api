import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocialmediaController } from './socialmedia/socialmedia.controller';
import { SocialmediaService } from './socialmedia/socialmedia.service';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientCredentialModule } from './client-credential/client-credential.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { CmsModule } from './cms/cms.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '8h' },
    }),
    MongooseModule.forRoot(process.env.LOCAL === 'true' ? process.env.MONGODB_DEVELOPMENT : process.env.MONGODB_PRODUCTION),
    ClientCredentialModule,
    UserModule,
    AuthModule,
    ProjectsModule,
    CmsModule,
    MailerModule,
  ],
  controllers: [AppController, SocialmediaController],
  providers: [AppService, SocialmediaService, JwtStrategy],
})
export class AppModule {}
