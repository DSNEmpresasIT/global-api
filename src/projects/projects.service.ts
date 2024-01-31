import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schema/Project.schema';
import { Model } from 'mongoose';

import { CreateProjectDto, UpdateProjectDto, UpdateProjectImageDto } from './dto/project-dto';
import { uploadImage } from 'src/libs/cloudinary-client';
import { Cloudinary } from 'src/company-credential/models/CompanyCredential.interface';
import { CompanyCredential } from 'src/company-credential/schemas/ClientCredential.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private projectsModel: Model<Project>,
    @InjectModel(CompanyCredential.name)
    private clientsModel: Model<CompanyCredential>
  ) {}

  async getAllClientProjects(clientId: string) {
    const clientProjects = await this.projectsModel.find({ clientId });
    return {
      projects: clientProjects
    }
  }

  async createProject(clientId: string, createProjectDto: CreateProjectDto) {
    try {
      const imageUrl = [];
      const clientKeys = await this.clientsModel.find({
        clientId
      }).select(['clientId', 'cloudinary']);
      
      if (!clientKeys.length) throw new BadRequestException('Error in createProject service: client not found')
      
      if (createProjectDto.imageUrl && clientKeys) {
        await Promise.all(createProjectDto.imageUrl.map(async (image) => {
          if(!image) return;

          const url = await uploadImage(clientKeys[0].cloudinary, image);
          imageUrl.push(url);
        }))
      }

      const project = await new this.projectsModel({
        ...createProjectDto,
        imageUrl,
        clientId
      });
  
      await project.save()
      
      return project;
    } catch (error) {
      throw new BadGatewayException(`Error in createProject: ###${error.message}`)
    }
  }

  async updateProject(projectId: string, updateProjectDto: UpdateProjectDto) {
    try {
      const clientKeys = await this.clientsModel.findOne({ clientId: updateProjectDto.clientId }).select('cloudinary')
      let newImageUrl = [];

      await Promise.all(updateProjectDto.imageUrl.map(async (currentImage, index) => {
        if (!currentImage) return;

        if (typeof currentImage === 'string') {
          const imageUrl = await uploadImage(clientKeys.cloudinary, currentImage)
          return newImageUrl[index] = imageUrl;
        } 

        newImageUrl[index] = currentImage
      }))

      return await this.projectsModel.updateOne(
        { _id: projectId },
        { $set: { 
          title: updateProjectDto.title, 
          description: updateProjectDto.description,
          project_date: updateProjectDto.project_date,
          type: updateProjectDto.type,
          projectClient: updateProjectDto.projectClient,
          imageUrl: newImageUrl 
        } }  
      )
    } catch (error) {
      console.log(error)
      throw new BadGatewayException(`Error in updateProject: ###${error.message}`)      
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
  
  async updateProjectImage(projectId: string, updateProjectImageDto: UpdateProjectImageDto, cloudinaryKeys: Cloudinary = undefined) {
    let clientKeys: CompanyCredential 
    try {
      if (!cloudinaryKeys) {
        clientKeys = await this.clientsModel.findOne({ clientId: updateProjectImageDto.clientId }).select('cloudinary'); 
        if (!clientKeys) throw new BadRequestException('Error in uploadProjectImage service: Client not found');
      }

      const upload = await uploadImage(
        cloudinaryKeys ?? clientKeys.cloudinary, 
        updateProjectImageDto.image
      );

      if (updateProjectImageDto.index || updateProjectImageDto.index === 0) {
        return await this.projectsModel.updateOne(
          { _id: projectId }, 
          { $set: { [`imageUrl.${updateProjectImageDto.index}`]: upload } }
        );
      } else {
        return await this.projectsModel.updateOne(
          { _id: projectId }, 
          { $addToSet: { 'imageUrl': upload } }
        );
      }
    } catch (error) {
      throw new BadGatewayException(`Error in uploadProjectImage service: ${error.message}`);
    }
  }
}