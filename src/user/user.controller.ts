import { Body, Controller, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './models/user.interface';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly service: UserService
  ) {}

  @Put(':userId')
  async updateUser(@Param() param, @Body() body: UpdateUserDto) {
    return await this.service.updateUser(param.userId, body);
  }
}
