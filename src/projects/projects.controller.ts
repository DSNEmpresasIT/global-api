import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto, UpdateProjectImageDto } from './dto/project-dto';

@Controller('projects')
export class ProjectsController {
  constructor(readonly service: ProjectsService) {}
  @Post('create/:clientName')
  async createProject(@Body() body: CreateProjectDto, @Param() param) {
    return this.service.createProject(param.clientName, body)
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

  @Put(':clientName/:projectId')
  async updateProject(@Param() param, @Body() body: UpdateProjectDto) {
    return await this.service.updateProject(param.projectId, param.clientName, body);
  }

  @Put(':projectId/image')
  async updateProjectImage(@Param() param, @Body() body: UpdateProjectImageDto) {
    return await this.service.updateProjectImage(param.projectId, body)
  }

  @Delete(':projectId')
  async deleteProject() {
    return {
      ok: true
    }
  }
}
