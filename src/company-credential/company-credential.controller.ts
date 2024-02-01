import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { CompanyCredentialService } from './company-credential.service';
import { CreateCompanyCredentialDto, UpdateCompanyCredentialDto } from './dto/company-credentials-dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesTypes } from 'src/auth/decorators/roles.interface';
import { GetCompanyKeysQuery } from './models/CompanyCredential.interface';

@Controller('api/client-credential')
export class CompanyCredentialController {
  constructor(private service: CompanyCredentialService) {}

  @Roles(RolesTypes.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @Post(':clientId/create')
  async createUserCred(
    @Body() createCompanyCredential: CreateCompanyCredentialDto,
    @Param() param
  ) {
    return await this.service.createCompanyCredential(
      param.clientId,      
      createCompanyCredential
    );
  }

  // @Roles(RolesTypes.ADMIN)
  // @UseGuards(JwtGuard, RoleGuard)
  @Put(':clientId')
  async updateCompanyCredential(@Body() body: UpdateCompanyCredentialDto, @Param() param) {
    return await this.service.updateCompanyCredential(param.clientId, body);
  }

  @Roles(RolesTypes.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @Get(':companyId')
  async getCompanyCredentialByName(@Param() param, @Query() querys: GetCompanyKeysQuery) {
    
    return await this.service.getCompanyCredential(param.companyId, querys);
  }
}
