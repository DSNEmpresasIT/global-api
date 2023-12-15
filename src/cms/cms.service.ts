import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from './schema/Content.schema';
import { CreateClientContentDto } from './dto/cms-dto';

@Injectable()
export class CmsService {
  constructor(
    @InjectModel(Content.name)
    private contentModel: Model<Content>,
  ) {}

  async createClientContent(CreateContentDto: CreateClientContentDto) {
    try {
      const verify = await this.contentModel.findOne({ clientName: CreateContentDto.clientName })
      if (verify) throw new BadRequestException('Client already created')

      const clientContent = await new this.contentModel(CreateContentDto);
      await clientContent.save();

      return clientContent;
    } catch (error) {
      throw new BadGatewayException('error on CMS services, createClientContent: ', error.message) 
    }
  }
  
  async getClientProjectTypes(clientName: string) {
    try {
      const projectTypes = await this.contentModel.findOne({ clientName }).select('project_types')

      if (!projectTypes) throw new BadRequestException('Client project types not found')

      return projectTypes;
    } catch (error) {
      throw new BadGatewayException('error on CMS services, getClientProjectTypes: ', error.message)
    }
  }
}
