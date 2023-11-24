import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schema/Project.schema';
import { Model } from 'mongoose';

import { CreateProjectDto } from './dto/project-dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private model: Model<Project>
  ) {}
  async getAllClientProjects(clientName: string) {
    return {
      projects: clientName
    }
  }

  async createProject(projectBody: CreateProjectDto) {
    const newProject = new this.model(projectBody);
    
  }
}
