import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from './schema/Content.schema';
import { CreateClientContentDto } from './dto/cms-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectType } from './entity/project_types.entity';
import { Repository } from 'typeorm';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class CmsService {
  constructor(
    @InjectModel(Content.name) private contentModel: Model<Content>,
    @InjectRepository(ProjectType) private readonly projectTypeRepo: Repository<ProjectType>,
    private readonly companyServices: CompanyService,
  ) {}

  async createCompanyProjectTypes(companyId: number, CreateContentDto: CreateClientContentDto) {
    try {
      const company = await this.companyServices.getCompanyById(companyId);

      const projectTypeData = {
        label: CreateContentDto.name,
        value: CreateContentDto.name.toLocaleLowerCase().replace(/\s/g, '_'),
        company
      }

      const projectType = await this.projectTypeRepo.create(projectTypeData).save()

      return projectType;
    } catch (error) {
      throw new BadGatewayException('error on CMS services, createClientContent: ', error.message) 
    }
  }

  async getProjectTypeById(projectTypeId: number) {
    try { 
      const projectType = await this.projectTypeRepo.findOne({
        where: { id: projectTypeId }
      })
      
      return projectType;
    } catch (error) {
      throw new BadGatewayException(`Error in getProjectTypeById: ${error.message}`)
    }
  }
  
  async getClientProjectTypes(clientId: string) {
    try {
      const projectTypes = await this.contentModel.findOne({ clientId }).select('project_types')

      return projectTypes;
    } catch (error) {
      console.log(`error on CMS services, getClientProjectTypes: ${error.response.message}`)
      throw new BadGatewayException(error.response.message)
    }
  }
}
