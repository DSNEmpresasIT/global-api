import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto, UpdateProjectImageDto } from './dto/project-dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesTypes } from 'src/auth/decorators/roles.interface';

@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}
  
  @UseGuards(JwtGuard)
  @Post('create/:companyId')
  async createProject(@Body() body: CreateProjectDto, @Param() param) {
    return this.service.createProject(param.companyId, body)
  }
 
  @Get('client/:companyId')
  async getAllCompanyProjects(@Param() params) {
    const companyId = params.companyId;
    return await this.service.getAllCompanyProjects(companyId);
  }

  @Get(':projectId')
  async getProjectDataById(@Param('projectId') projectId) {
    return await this.service.getProjectDataById(projectId);
  }

  @UseGuards(JwtGuard)
  @Put(':projectId/desactivate')
  async desactivateProject(@Param() param) {
    return await this.service.desactivateProject(param.projectId)
  }
  
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':projectId/activate')
  async activateProject(@Param() param) {
    return await this.service.activateProject(param.projectId)
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Put(':projectId')
  async updateProject(@Param() param, @Body() body: UpdateProjectDto) {
    return await this.service.updateProject(param.projectId, body);
  }

  // @UseGuards(JwtGuard)
  // @Put(':projectId/image')
  // async updateProjectImage(@Param() param, @Body() body: UpdateProjectImageDto) {
  //   return await this.service.updateProjectImage(param.projectId, body)
  // }
}
