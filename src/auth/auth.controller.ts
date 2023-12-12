import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RegisterDTO } from 'src/user/dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const user = await this.userService.create(registerDTO);
    const payload = {
      Id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.userService.findByLogin(loginDTO);
    const payload = {
      Id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
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
