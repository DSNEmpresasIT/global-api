import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/user/dto/register.dto';
import { LoginDTO } from './dto/auth-dto';
import { Roles } from './decorators/roles.decorator';
import { RolesTypes } from './decorators/roles.interface';
import { JwtGuard } from './guards/jwt.guard';
import { RoleGuard } from './guards/role.guard';
import { Model } from 'mongoose';
import { CompanyCredential } from 'src/company-credential/models/CompanyCredential.interface';
import { InjectModel } from '@nestjs/mongoose';

@Controller('api/auth')
export class AuthController {
  constructor(
      private readonly userService: UserService,
      private readonly authService: AuthService,
      @InjectModel(CompanyCredential.name)
      private readonly credentialModel: Model<CompanyCredential>
  ) {}

  // @Roles(RolesTypes.ADMIN)
  // @UseGuards(JwtGuard, RoleGuard)
  @Post('register/:company_id')
  async register(@Param() param,@Body() registerDto: RegisterDto) {
    const user = await this.userService.create(param.company_id, registerDto);
    const payload = {
      id: user.id,
      company: user.company,
      role: user.role,
      email: user.email,
      userName: user.userName
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
    return user;
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.userService.findByLogin(loginDTO);
    const payload = {
      id: user.id,
      role: user.role,
      email: user.email,
      userName: user.userName
    };
    const token = await this.authService.signPayload(payload);
    return { user: { ...user}, token};
  }

  @Post('verify-token')
  async verifyToken(@Req() req) {
    const token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }
    try {
      const decoded = await this.authService.verifyToken(token);
      return { message: 'Valid token', user: decoded };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
