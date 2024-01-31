import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/company.dto';

@Controller('api/company')
export class CompanyController {
  constructor (
    private readonly companyService: CompanyService,
  ) {}

  @Post('register')
  async createCompany(@Body() body: CreateCompanyDto) {
    return await this.companyService.create(body);
  }

  @Get(':company_id')
  async getCompanyById(@Param() param) {
    return await this.companyService.getCompanyById(param.company_id)
  }
}
