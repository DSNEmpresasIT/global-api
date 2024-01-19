import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './models/user.interface';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesTypes } from 'src/auth/decorators/roles.interface';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly service: UserService
  ) {}
  
  @Roles(RolesTypes.ADMIN)
  @UseGuards(RoleGuard)
  @Get('all')
  async getAllUsers() {
    return await this.service.getAllUsers();
  }

  @Roles(RolesTypes.ADMIN)
  @UseGuards(RoleGuard)
  @Put(':userId')
  async updateUser(@Param() param, @Body() body: UpdateUserDto) {
    return await this.service.updateUser(param.userId, body);
  }

  @Roles(RolesTypes.ADMIN)
  @UseGuards(RoleGuard)
  @Get(':userId')
  async getUserData(@Param() param) {
    return this.service.getUserData(param.userId)
  }

  @Roles(RolesTypes.ADMIN)
  @UseGuards(RoleGuard)
  @Delete(':userId')
  async deleteUser(@Param() param) {
    return this.service.deleteUser(param.userId);
  }
}
