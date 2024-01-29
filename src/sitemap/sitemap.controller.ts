import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { SitemapService } from './sitemap.service';
import { GetSiteMapDto, QueryParamsGetSitemap } from './dto/sitemap.dto';

@Controller('api/sitemap')
export class SitemapController {
  constructor(
    private readonly service: SitemapService,
  ) {}

  @Get(':clientId')
  async getSitemap(@Param() param, @Query() query: QueryParamsGetSitemap, @Body() body: GetSiteMapDto) {
    return this.service.getSitemap(param.clientId, query, body);
  }
}
