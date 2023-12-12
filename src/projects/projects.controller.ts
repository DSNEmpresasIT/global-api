import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto, UpdateProjectImageDto } from './dto/project-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/projects')
export class ProjectsController {
  constructor(readonly service: ProjectsService) {}
  
  @UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'))
  @Put(':clientName/:projectId')
  async updateProject(@Param() param, @Body() body: UpdateProjectDto) {
    return await this.service.updateProject(param.projectId, param.clientName, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':projectId/image')
  async updateProjectImage(@Param() param, @Body() body: UpdateProjectImageDto) {
    return await this.service.updateProjectImage(param.projectId, body)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':projectId')
  async deleteProject() {
    return {
      ok: true
    }
  }
}
