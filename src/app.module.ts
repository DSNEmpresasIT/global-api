import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocialmediaController } from './socialmedia/socialmedia.controller';
import { SocialmediaService } from './socialmedia/socialmedia.service';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyCredentialModule } from './company-credential/company-credential.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { CmsModule } from './cms/cms.module';
import { MailerModule } from './mailer/mailer.module';
import { SitemapController } from './sitemap/sitemap.controller';
import { SitemapService } from './sitemap/sitemap.service';
import { SitemapModule } from './sitemap/sitemap.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '8h' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: [__dirname+'/**/*.entity.{ts,js}'],
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true,
    }),
    MongooseModule.forRoot(process.env.LOCAL === 'true' ? process.env.MONGODB_DEVELOPMENT : process.env.MONGODB_PRODUCTION),
    CompanyCredentialModule,
    UserModule,
    AuthModule,
    ProjectsModule,
    CmsModule,
    MailerModule,
    SitemapModule,
    CompanyModule,
  ],
  controllers: [AppController, SocialmediaController, SitemapController],
  providers: [AppService, SocialmediaService, JwtStrategy, SitemapService],
})
export class AppModule {}
