import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schema/Project.schema';
import { Model } from 'mongoose';

import { CreateProjectDto, UpdateProjectImageDto } from './dto/project-dto';
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
    const clientProjects = await this.projectsModel.find({ clientName: clientName });
    return {
      projects: clientProjects
    }
  }

  async createProject(createProjectDto: CreateProjectDto) {
    try {
      const clientKeys = await this.clientsModel.find({
        clientName: createProjectDto.clientName
      }).select(['clientName', 'cloudinary']);
      
      if (!clientKeys.length) throw new BadRequestException('Error in createProject service: client not found')
      
      const project = await new this.projectsModel({
        ...createProjectDto,
        imageUrl: undefined
      });
  
      if (createProjectDto.imageUrl) {
        const imageUrl = [];
        await Promise.all(createProjectDto.imageUrl.map(async (image) => {
          const url = await uploadImage(clientKeys[0].cloudinary, image);

          imageUrl.push(url);
        }))
        
        project.imageUrl = imageUrl;
      }
      await project.save()
      
      return project;
    } catch (error) {
      throw new BadGatewayException(`Error in createProject: ###${error.message}`)
    }
  }

  async updateProject() {
    
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
  
  async updateProjectImage(projectId: string, updateProjectImageDto: UpdateProjectImageDto, cloudinaryKeys: Cloudinary) {
    let clientKeys: ClientCredential 
    try {
      if (!cloudinaryKeys) {
        clientKeys = await this.clientsModel.findOne({ clientName: updateProjectImageDto.clientName }).select('cloudinary'); 
        if (!clientKeys) throw new BadRequestException('Error in uploadProjectImage service: Client not found');
      }

      const project = await this.projectsModel.findOne({ _id: projectId });
      if (!project) throw new BadRequestException('Error in uploadProjectImage service: Project not found');

      const upload = await uploadImage(
        cloudinaryKeys ?? clientKeys.cloudinary, 
        updateProjectImageDto.image
      );
      
      if (project.imageUrl && project.imageUrl[updateProjectImageDto.index]) {
        project.imageUrl[updateProjectImageDto.index] = upload;
      } else {
        project.imageUrl = [upload]
      }
      project.save();

      return project;
    } catch (error) {
      throw new BadGatewayException(`Error in uploadProjectImage service: ${error.message}`);
    }
  }
}
