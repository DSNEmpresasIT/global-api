import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CmsService } from './cms.service';
import { CreateClientContentDto } from './dto/cms-dto';

@Controller('api/cms')
export class CmsController {
  constructor(
    private readonly cmsService: CmsService
  ) {}

  @UseGuards(JwtGuard)
  @Post('create')
  async createClientConten(@Body() body: CreateClientContentDto) {
    return await this.cmsService.createClientContent(body)
  }
  
  @Get(':clientId/projects-types')
  async getClientProjectCMS(@Param() param) {
    return await this.cmsService.getClientProjectTypes(param.clientId);
  }
}
