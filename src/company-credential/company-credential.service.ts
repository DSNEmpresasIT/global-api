import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompanyCredentialDto, UpdateCompanyCredentialDto } from './dto/company-credentials-dto';
import { CompanyCredential } from './schemas/ClientCredential.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyKeys } from './entity/company-credential.entity';
import { Company } from 'src/company/entity/company.entity';
import { GetCompanyKeysQuery } from './models/CompanyCredential.interface';
import { EmailKeys } from './entity/email-keys.entity';
import { CloudinaryKeys } from './entity/cloudinary-key.entity';
import { ReCaptchaKey } from './entity/recaptcha-key.entity';

@Injectable()
export class CompanyCredentialService {
  constructor(
    @InjectModel(CompanyCredential.name)
    private CompanyCredentialModel: Model<CompanyCredential>,
  ) {}
  async getCompanyCredentials(): Promise<CompanyKeys[]> {
    try {
      return await CompanyKeys.find({
        relations: {
          email_keys: true,
          recaptcha_keys: true,
          cloudinary_keys: true,
        },
      });
    } catch (error) {
      throw new NotFoundException('Unable to fetch client credentials');
    }
  }

  async getCompanyCredential(companyId: number, relations: GetCompanyKeysQuery): Promise<CompanyKeys> {
    try {
      return await CompanyKeys.findOne({ 
        where: { id: companyId },
        relations: {
          cloudinary_keys: relations.cloudinaryKey,
          email_keys: relations.emailKeys,
          recaptcha_keys: relations.recaptchaKeys
        }
      });
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
    company_id: number,
    updateCompanyCredentialDto: UpdateCompanyCredentialDto,
  ) {
    try {
      const companyKeys = await CompanyKeys.findOne({
        where: { company_id },
        relations: {
          cloudinary_keys: true,
          email_keys: true,
          recaptcha_keys: true
        }
      })

      if(updateCompanyCredentialDto.email) {
        const newEmail = updateCompanyCredentialDto.email; 
        companyKeys.email_keys.email = newEmail.email;
        companyKeys.email_keys.host = newEmail.host;
        companyKeys.email_keys.user = newEmail.user;
        companyKeys.email_keys.port = +newEmail.port;
        companyKeys.email_keys.password = newEmail.password;
      }
      
      return companyKeys.save();
    } catch (error) {
      throw new NotFoundException(`Unable to update client credential: ${error.message}`);
    }
  }

  async createEntity(company: Company, createCompanyCredentialDto: CreateCompanyCredentialDto) {
    try {
      const company_keys = await CompanyKeys.create({
        company_id: company.id,
        ...createCompanyCredentialDto
      }).save();

      await EmailKeys.create({}).save()
      await CloudinaryKeys.create({}).save()
      await ReCaptchaKey.create({}).save()
      
      return company_keys;
    } catch (error) {
      throw new BadGatewayException(`Error in ClientCredentialService.createEntity: ${error.message}`)
    }
  }
}
