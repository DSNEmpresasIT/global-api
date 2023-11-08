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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
      
    })
  ],
  controllers: [AppController, SocialmediaController, MailerController],
  providers: [
    AppService, 
    SocialmediaService, 
    MailerService, 
    JwtStrategy
  ],
})

export class AppModule {}
