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
  async getAllCompanyCredentials(): Promise<CompanyKeys[]> {
    try {

      return await CompanyKeys.find();
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

  async updateCompanyCredential(
    company_id: number,
    updateCompanyCredentialDto: UpdateCompanyCredentialDto,
  ) {
    try {
      const companyKeys = await CompanyKeys.findOne({
        where: { 
          company: {
            id: company_id
          }
        },
        relations: {
          cloudinary_keys: true,
          email_keys: true,
          recaptcha_keys: true
        }
      });

      if (updateCompanyCredentialDto.cloudinary) {
        companyKeys.cloudinary_keys.api_key = updateCompanyCredentialDto.cloudinary.api_key
        companyKeys.cloudinary_keys.api_secret = updateCompanyCredentialDto.cloudinary.api_secret
        companyKeys.cloudinary_keys.cloud_name = updateCompanyCredentialDto.cloudinary.cloud_name
      }

      if(updateCompanyCredentialDto.email) {
        const newEmail = updateCompanyCredentialDto.email; 
        companyKeys.email_keys.email = newEmail.email;
        companyKeys.email_keys.host = newEmail.host;
        companyKeys.email_keys.user = newEmail.user;
        companyKeys.email_keys.port = +newEmail.port;
        companyKeys.email_keys.password = newEmail.password;
      }
      
      if(updateCompanyCredentialDto.recapcha) {
        companyKeys.recaptcha_keys.key = updateCompanyCredentialDto.recapcha.key
        companyKeys.recaptcha_keys.secret_key = updateCompanyCredentialDto.recapcha.secretKey
      }

      if (updateCompanyCredentialDto.instagram) {
        companyKeys.instagram_key = updateCompanyCredentialDto.instagram
      }

      if (updateCompanyCredentialDto.supabaseKey) {
        companyKeys.supabaseKey = updateCompanyCredentialDto.supabaseKey
      }

      if (updateCompanyCredentialDto.supabaseUrl) {
        companyKeys.supabaseUrl = updateCompanyCredentialDto.supabaseUrl
      }

      return companyKeys.save();
    } catch (error) {

      throw new NotFoundException(`Unable to update client credential: ${error.message}`);
    }
  }

  async createEntity(createCompanyCredentialDto: CreateCompanyCredentialDto) {
    try {
      const companyKeys = await CompanyKeys.create({
        ...createCompanyCredentialDto
      });

      const emailKeys = await EmailKeys.create().save()
      const cloudinaryKeys = await CloudinaryKeys.create().save()
      const recaptchaKeys = await ReCaptchaKey.create().save()
      
      companyKeys.email_keys = emailKeys;
      companyKeys.cloudinary_keys = cloudinaryKeys;
      companyKeys.recaptcha_keys = recaptchaKeys

      await CompanyKeys.save(companyKeys);

      return companyKeys;
    } catch (error) {
      throw new BadGatewayException(`Error in ClientCredentialService.createEntity: ${error.message}`)
    }
  }
}
