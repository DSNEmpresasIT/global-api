import { Module } from '@nestjs/common';
import { SitemapController } from './sitemap.controller';
import { SitemapService } from './sitemap.service';
import { ProjectsModule } from 'src/projects/projects.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ProjectsModule,
    UserModule
  ],
  controllers: [SitemapController],
  providers: [SitemapService]
})
export class SitemapModule {}
