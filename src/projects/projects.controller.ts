import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UploadProjectImageDto } from './dto/project-dto';

@Controller('projects')
export class ProjectsController {
  constructor(readonly service: ProjectsService) {}
  @Post('create')
  async createProject(@Body() body: CreateProjectDto) {
    return this.service.createProject(body)
  }
 
  @Get('client/:clientName')
  async getClientProjects(@Param() params) {
    const clientName = params.clientName;
    return await this.service.getAllClientProjects(clientName);
  }

  @Get(':projectId')
  async getProjectData(@Param('projectId') projectId) {
    return await this.service.getProjectData(projectId);
  }

  @Put('image')
  async uploadProjectImage(@Body() body: UploadProjectImageDto) {
    return await this.service.uploadProjectImage(body)
  }
}
