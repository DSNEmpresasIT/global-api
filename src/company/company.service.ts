import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entity/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/company.dto';

@Injectable()
export class CompanyService {
  constructor (
    @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
  ) {}

  async create(CreateCompanyDto: CreateCompanyDto) {
    try {
      const company = this.companyRepo.create(CreateCompanyDto);

      return await this.companyRepo.save(company);
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
            }
          },
          relations: {
            users: false
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
