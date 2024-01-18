import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto, UpdateProjectImageDto } from './dto/project-dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesTypes } from 'src/auth/roles/roles.interface';

@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}
  
  @UseGuards(JwtGuard)
  @Post('create/:clientId')
  async createProject(@Body() body: CreateProjectDto, @Param() param) {
    return this.service.createProject(param.clientId, body)
  }
 
  @Get('client/:clientId')
  async getClientProjects(@Param() params) {
    const clientId = params.clientId;
    return await this.service.getAllClientProjects(clientId);
  }

  @Get(':projectId')
  async getProjectData(@Param('projectId') projectId) {
    return await this.service.getProjectData(projectId);
  }

  @Roles(RolesTypes.PREMIUM, RolesTypes.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':projectId')
  async updateProject(@Param() param, @Body() body: UpdateProjectDto) {
    return await this.service.updateProject(param.projectId, body);
  }

  @UseGuards(JwtGuard)
  @Put(':projectId/image')
  async updateProjectImage(@Param() param, @Body() body: UpdateProjectImageDto) {
    return await this.service.updateProjectImage(param.projectId, body)
  }

  @Roles(RolesTypes.CUSTOMER, RolesTypes.PREMIUM, RolesTypes.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':projectId')
  async deleteProject() {
    return {
      ok: true
    }
  }
}
