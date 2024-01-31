import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompanyCredentialDto, UpdateCompanyCredentialDto } from './dto/company-credentials-dto';
import { CompanyCredential } from './schemas/ClientCredential.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyKeys } from './entity/company-credential.entity';
import { Company } from 'src/company/entity/company.entity';

@Injectable()
export class CompanyCredentialService {
  constructor(
    @InjectModel(CompanyCredential.name)
    private CompanyCredentialModel: Model<CompanyCredential>,
    @InjectRepository(CompanyKeys) private readonly companyKeysRepo: Repository<CompanyKeys>
  ) {}
  async getCompanyCredentials(): Promise<CompanyCredential[]> {
    try {
      const CompanyCredentials = await this.CompanyCredentialModel.find();
      return CompanyCredentials;
    } catch (error) {
      throw new NotFoundException('Unable to fetch client credentials');
    }
  }

  async getCompanyCredential(clientName: string): Promise<CompanyCredential> {
    try {
      
      return await this.CompanyCredentialModel.findOne({ clientName });
    } catch (error) {
      throw new NotFoundException('Unable to fetch client credential');
    }
  }

  async createCompanyCredential(
    clientId: string,
    CompanyCredentialDto: CreateCompanyCredentialDto,
  ): Promise<CompanyCredential> {
    try {
      const validate = await this.CompanyCredentialModel.find({ clientId })
      if (validate.length) throw new BadRequestException('This user are already in the database')

      const CompanyCredential = await new this.CompanyCredentialModel({
        ...CompanyCredentialDto,
        clientId
      });
      await CompanyCredential.save();

      return CompanyCredential;
    } catch (error) {
      throw new NotFoundException('Unable to create client credential');
    }
  }

  async deleteCompanyCredential(
    clientCredID: string,
  ): Promise<CompanyCredential> {
    try {
      
      return await this.CompanyCredentialModel.findByIdAndDelete(clientCredID);
    } catch (error) {
      throw new NotFoundException('Unable to delete client credential');
    }
  }

  async updateCompanyCredential(
    clientId: string,
    updateCompanyCredentialDto: UpdateCompanyCredentialDto,
  ) {
    try {

      return await this.CompanyCredentialModel.updateOne(
        { clientId },
        updateCompanyCredentialDto,
      );
    } catch (error) {
      throw new NotFoundException('Unable to update client credential: ' + error.message);
    }
  }

  async createEntity(company: Company, createCompanyCredentialDto: CreateCompanyCredentialDto) {
    try {
      const company_keys = this.companyKeysRepo.create({
        company,
        company_id: company.id,
        ...createCompanyCredentialDto
      });
  
      await this.companyKeysRepo.save(company_keys)
      
      return company_keys;
    } catch (error) {
      throw new BadGatewayException(`Error in ClientCredentialService.createEntity: ${error.message}`)
    }
  }
}
