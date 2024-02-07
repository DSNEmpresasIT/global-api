import { Body, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { SitemapService } from './sitemap.service';
import { GetSiteMapDto, QueryParamsGetSitemap } from './dto/sitemap.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesTypes } from 'src/auth/decorators/roles.interface';

@Controller('api/sitemap')
export class SitemapController {
  constructor(
    private readonly service: SitemapService,
  ) {}

  // @Roles(RolesTypes.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @Get(':clientId')
  async getSitemap(@Param() param, @Query() query: QueryParamsGetSitemap, @Body() body: GetSiteMapDto) {
    return this.service.getSitemap(param.clientId, query, body);
  }
}
