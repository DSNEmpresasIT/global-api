import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocialmediaController } from './socialmedia/socialmedia.controller';
import { SocialmediaService } from './socialmedia/socialmedia.service';
import { ConfigModule } from '@nestjs/config';
import { MailerController } from './mailer/mailer.controller';
import { MailerService } from './mailer/mailer.service';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientCredentialModule } from './user-credential/client-credential.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { CmsModule } from './cms/cms.module';
import { CmsController } from './cms/cms.controller';
import { CmsService } from './cms/cms.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '8h' },
    }),
    MongooseModule.forRoot(process.env.MONGODB_DEVELOPMENT),
    ClientCredentialModule,
    UserModule,
    AuthModule,
    ProjectsModule,
    CmsModule,
  ],
  controllers: [AppController, SocialmediaController, MailerController],
  providers: [AppService, SocialmediaService, MailerService, JwtStrategy],
})
export class AppModule {}
