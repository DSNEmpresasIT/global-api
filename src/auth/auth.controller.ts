import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/user/dto/register.dto';
import { LoginDTO } from './dto/auth-dto';

@Controller('api/auth')
export class AuthController {
  constructor(
      private readonly userService: UserService,
      private readonly authService: AuthService,
  ) {}
  
  @Post('secret_endpoint/register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.userService.create(registerDto);
    const payload = {
      id: user._id,
      clientName: user.clientName,
      role: user.role,
      email: user.email,
      userName: user.userName
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.userService.findByLogin(loginDTO);
    const payload = {
      id: user._id,
      clientName: user.clientName,
      role: user.role,
      email: user.email,
      userName: user.userName
    };
    const token = await this.authService.signPayload(payload);
    return { user: { id: user._id, ...user, _id: undefined }, token};
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
