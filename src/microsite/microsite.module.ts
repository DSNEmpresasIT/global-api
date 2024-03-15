import { Module } from '@nestjs/common';
import { MicrositeService } from './microsite.service';
import { MicrositeController } from './microsite.controller';
import { AboutComponent } from './entities/about-component.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerComponent } from './entities/banner-component.entity';
import { MicrositePage } from './entities/microsite-page.entity';

@Module({
  controllers: [MicrositeController],
  providers: [MicrositeService],
  imports: [
    TypeOrmModule.forFeature([MicrositePage, AboutComponent, BannerComponent]),
  ],
})
export class MicrositeModule {}
