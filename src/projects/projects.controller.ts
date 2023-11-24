import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/project-dto';

@Controller('projects')
export class ProjectsController {
  constructor(readonly service: ProjectsService) {}
  @Post()
  async createProject(@Body() body: CreateProjectDto) {
    return this.service.createProject(body)
  }
 
  @Get('client/:clientName')
  async getClientProjects(@Param() params) {
    const clientName = params.clientName;
    return await this.service.getAllClientProjects(clientName);
  }

  @Put()
  async updateProject( @Param() params) {
    return params;
  }
}
