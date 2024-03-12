import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schema/Project.schema';
import { Model } from 'mongoose';
import { Project as ProjectEntity } from './entity/project.entity';

import { CreateProjectDto, UpdateProjectDto, UpdateProjectImageDto } from './dto/project-dto';
import { uploadImage } from 'src/libs/cloudinary-client';
import { Cloudinary } from 'src/company-credential/models/CompanyCredential.interface';
import { CompanyCredential } from 'src/company-credential/schemas/ClientCredential.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/company/entity/company.entity';
import { Image } from './entity/image.entity';
import { CmsService } from 'src/cms/cms.service';
import { CompanyCredentialService } from 'src/company-credential/company-credential.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(CompanyCredential.name) private clientsModel: Model<CompanyCredential>,
    @InjectRepository(Project) private readonly projectRepo: Repository<ProjectEntity>,
    @InjectRepository(Image) private readonly imagesRepo: Repository<Image>,
    @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
    private readonly cmsService: CmsService,
    private readonly companyCredentialService: CompanyCredentialService,
  ) {}

  async getAllCompanyProjects(companyId: number) {
    const companyProjects = await this.projectRepo.findBy({ 
      id: companyId
     });

    return {
      projects: companyProjects
    }
  }

  async createProject(companyId: number, createProjectDto: CreateProjectDto) {
    try {
      const images = [];
      const project_type = 
        createProjectDto.project_type_id 
          ? await this.cmsService.getProjectTypeById(createProjectDto.project_type_id )
          : undefined;

      const company = await this.companyRepo.findOne({
        where: { id: companyId },
        relations: {
          keys: {
            cloudinary_keys: true
          }
        }
      })

      if (!company) {
        throw new BadRequestException('Error in createProject service: company not found')
      }

      if (!company.keys) {
        throw new BadRequestException('Error in createProject service: company keys not found')
      }
      
      if (createProjectDto.images && company.keys.cloudinary_keys) {
        await Promise.all(createProjectDto.images.map(async (image) => {
          if(!image) return;

          const url = await uploadImage(company.keys.cloudinary_keys, image);
          
          const newImage = await this.imagesRepo.create({
            cloudinary_id: url.id,
            url: url.url
          }).save()
          images.push(newImage);
        }))
      }
      
      const projectData = {
        ...createProjectDto,
        images,
        companyId,
        project_type
      };
      
      const project = await this.projectRepo.create({
        ...projectData,
        company
      }).save()
      
      return {
        ...project,
        company: undefined
      };
    } catch (error) {
      throw new BadGatewayException(`Error in createProject: ###${error.message}`)
    }
  }

  async updateProject(projectId: number, updateProjectDto: UpdateProjectDto) {
    try {
      const projectType = await this.cmsService.getProjectTypeById(updateProjectDto.type)

      if (!projectType) {
        throw new BadRequestException('ProjectType not founded');
      }

      const project = await this.projectRepo.findOne({
        where: { id: projectId }
      })

      const clientKeys = await this.companyCredentialService.getCompanyCredential(updateProjectDto.companyId, { cloudinaryKey: true })
      let newImageUrl = [];

      await Promise.all(updateProjectDto.images.map(async (currentImage, index) => {
        if (!currentImage) return;

        if (typeof currentImage === 'string') {
          const imageUrl = await uploadImage(clientKeys.cloudinary_keys, currentImage)
          return newImageUrl[index] = imageUrl;
        } 

        newImageUrl[index] = currentImage
      }))

      if (updateProjectDto.title) {
        project.title = updateProjectDto.title
      }
      
      if (updateProjectDto.description) {
        project.description = updateProjectDto.description
      }

      if (updateProjectDto.project_client) {
        project.project_client = updateProjectDto.project_client
      }

      if (updateProjectDto.project_date) {
        project.project_date = updateProjectDto.project_date
      }

      project.project_type = projectType
      project.images = newImageUrl;
      await project.save()
      
      return project;
    } catch (error) {
      console.log(error)
      throw new BadGatewayException(`Error in updateProject: ###${error.message}`)      
    }
  }
  
  async getProjectDataById(projectId: number) {
    try {
      const project = await this.projectRepo.findOne({ 
        where: { id: projectId }
      });

      if (!project) {
        throw new BadRequestException('Error in getProjectData service: Project not found');
      }

      return project;
    } catch (error) {
      throw new BadGatewayException(`Error in getProjectData service: ${error.message}`)
    }
  }
  
  async desactivateProject(projectId: number) {
    try {
      const project = await this.projectRepo.findOne({
        where: { id: projectId }
      })

      project.active = false;
      await project.save();

      return project;
    } catch (error) {
      throw new BadGatewayException(`Error in desactiveProject service: ${error.message}`)
    }
  }
  
  async activateProject(projectId: number) {
    try {
      const project = await this.projectRepo.findOne({
        where: { id: projectId }
      })

      project.active = true;
      await project.save();

      return project;
    } catch (error) {
      throw new BadGatewayException(`Error in desactiveProject service: ${error.message}`)
    }
  }

  // async updateProjectImage(projectId: string, updateProjectImageDto: UpdateProjectImageDto, cloudinaryKeys: Cloudinary = undefined) {
  //   let clientKeys: CompanyCredential 
  //   try {
  //     if (!cloudinaryKeys) {
  //       clientKeys = await this.clientsModel.findOne({ clientId: updateProjectImageDto.clientId }).select('cloudinary'); 
  //       if (!clientKeys) throw new BadRequestException('Error in uploadProjectImage service: Client not found');
  //     }

  //     const upload = await uploadImage(
  //       cloudinaryKeys ?? clientKeys.cloudinary, 
  //       updateProjectImageDto.image
  //     );

  //     if (updateProjectImageDto.index || updateProjectImageDto.index === 0) {
  //       return await this.projectsModel.updateOne(
  //         { _id: projectId }, 
  //         { $set: { [`imageUrl.${updateProjectImageDto.index}`]: upload } }
  //       );
  //     } else {
  //       return await this.projectsModel.updateOne(
  //         { _id: projectId }, 
  //         { $addToSet: { 'imageUrl': upload } }
  //       );
  //     }
  //   } catch (error) {
  //     throw new BadGatewayException(`Error in uploadProjectImage service: ${error.message}`);
  //   }
  // }
}