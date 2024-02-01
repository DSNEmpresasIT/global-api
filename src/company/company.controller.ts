import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';

@Controller('api/company')
export class CompanyController {
  constructor (
    private readonly companyService: CompanyService,
  ) {}

  @Post('register')
  async createCompany(@Body() body: CreateCompanyDto) {
    return await this.companyService.create(body);
  }

  @Get('all')
  async getAllCompanies() {
    return this.companyService.getAllCompanies();
  }

  @Get(':company_id')
  async getCompanyById(@Param() param) {
    return await this.companyService.getCompanyById(param.company_id)
  }

  @Put(':companyId')
  async updateCompany(@Param() param, @Body() body: UpdateCompanyDto) {
    return await this.companyService.updateCompany(param.companyId, body);
  }
}
