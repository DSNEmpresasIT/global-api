import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schema/Project.schema';
import { Model } from 'mongoose';

import { CreateProjectDto, UploadProjectImageDto } from './dto/project-dto';
import { ClientCredential } from 'src/user-credential/schemas/ClientCredential.schema';
import { uploadImage } from 'src/libs/cloudinary-client';
import { Cloudinary } from 'src/user-credential/models/clientCredential.interface';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private projectsModel: Model<Project>,
    @InjectModel(ClientCredential.name)
    private clientsModel: Model<ClientCredential>
  ) {}
  async getAllClientProjects(clientName: string) {
    return {
      projects: clientName
    }
  }

  async createProject(createProjectDto: CreateProjectDto) {
    try {
      const clientKeys = await this.clientsModel.find({
        clientName: createProjectDto.clientName
      }).select(['clientName']);
  
      if (!clientKeys.length) throw new BadRequestException('Error in createProject service: client not found')
  
      const project = await new this.projectsModel(createProjectDto);
      await project.save()
  
      return project;
    } catch (error) {
      throw new BadGatewayException(`Error in createProject: ###${error.message}`)
    }
  }

  async getProjectData(projectId: string) {
    try {
      const project = await this.projectsModel.findOne({ _id: projectId });
      if (!project) throw new BadRequestException('Error in getProjectData service: Project not found');

      return project;
    } catch (error) {
      throw new BadGatewayException(`Error in getProjectData service: ${error.message}`)
    }
  }
  
  async uploadProjectImage(uploadProjectImageDto: UploadProjectImageDto) {
    try {
      const clientKeys: ClientCredential = await this.clientsModel.findOne({ clientName: uploadProjectImageDto.clientName }).select('cloudinary'); 
      if (!clientKeys) throw new BadRequestException('Error in uploadProjectImage service: Client not found');

      const project = await this.projectsModel.findOne({ _id: uploadProjectImageDto.projectId });
      if (!project) throw new BadRequestException('Error in uploadProjectImage service: Project not found');

      const upload = await uploadImage(clientKeys.cloudinary, uploadProjectImageDto.image);
      
      project.imageUrl ? project.imageUrl.push(upload) : project.imageUrl = [upload];
      project.save();
      return project;
    } catch (error) {
      throw new BadGatewayException(`Error in uploadProjectImage service: ${error.message}`);
    }
  }
}
