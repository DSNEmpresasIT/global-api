import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { CompanyCredentialService } from './company-credential.service';
import { UpdateCompanyCredentialDto } from './dto/company-credentials-dto';
import { GetCompanyKeysQuery } from './models/CompanyCredential.interface';

@Controller('api/client-credential')
export class CompanyCredentialController {
  constructor(private service: CompanyCredentialService) {}

  @Get('all')
  async getAllCompanyCredentials() {
    return await this.service.getAllCompanyCredentials();
  }

  // @Roles(RolesTypes.ADMIN)
  // @UseGuards(JwtGuard, RoleGuard)
  @Put(':clientId')
  async updateCompanyCredential(@Body() body: UpdateCompanyCredentialDto, @Param() param) {
    return await this.service.updateCompanyCredential(param.clientId, body);
  }

  // @Roles(RolesTypes.ADMIN)
  // @UseGuards(JwtGuard, RoleGuard)
  @Get(':companyId')
  async getCompanyCredentialByName(@Param() param, @Query() querys: GetCompanyKeysQuery) {
    
    return await this.service.getCompanyCredential(param.companyId, querys);
  }
}
