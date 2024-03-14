import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CmsService } from './cms.service';
import { CreateClientContentDto } from './dto/cms-dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesTypes } from 'src/auth/decorators/roles.interface';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Controller('api/cms')
export class CmsController {
  constructor(
    private readonly cmsService: CmsService
  ) {}

  @UseGuards(JwtGuard,RoleGuard)
  @Roles(RolesTypes.ADMIN)
  @Post('create/:companyId')
  async createCompanyProjectTypes(@Param() param, @Body() body: CreateClientContentDto) {
    return await this.cmsService.createCompanyProjectTypes(param.companyId, body)
  }
  
  @Get(':clientId/projects-types')
  async getClientProjectCMS(@Param() param) {
    return await this.cmsService.getClientProjectTypes(param.clientId);
  }
}
