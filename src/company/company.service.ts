import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entity/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/company.dto';
import { CompanyCredentialService } from 'src/company-credential/company-credential.service';

@Injectable()
export class CompanyService {
  constructor (
    @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
    private readonly companyKeys: CompanyCredentialService
  ) {}

  async create(CreateCompanyDto: CreateCompanyDto) {
    try {
      const company = this.companyRepo.create(CreateCompanyDto);
      await this.companyRepo.save(company);

      const keys = await this.companyKeys.createEntity(company, {});
      company.keys = keys

      await this.companyRepo.save(company);

      return company;
    } catch (error) {

      throw new BadGatewayException(`Error in CompanyService.create ${error.message}`)      
    }
  }

  async getCompanyById(company_id: number, users: boolean = false) {
    try {
      const company = await this.companyRepo.findOne(
        { 
          where: { 
            id: company_id 
          },
          select: {
            users: {
              email: true,
              id: true,
              role: true,
              userName: true
            },
          },
          relations: {
            users,
            keys: true
          }
        },
      )

      if(!company) {
        throw new BadRequestException('Company not found')
      }

      return company;
    } catch (error) {
      throw new BadGatewayException(`Error in CompanyService.getCompanyById: ${error.message}`)
    }
  }
}
