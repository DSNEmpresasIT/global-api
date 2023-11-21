/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RegisterDTO } from 'src/user/dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        
      ) {}


 @Get("/onlyauth")
 @UseGuards(AuthGuard("jwt"))
 
  async hiddenInformation(){
    return  "hidden information";
  }
  
@Get("/anyone")

async publicInformation(){
return  "this can be seen by anyone";
}

    @Post('register')
    async register(@Body() registerDTO: RegisterDTO) {
      const user = await this.userService.create(registerDTO);
      const payload = {
        Id: user.id,
        name: user.name,
        role: user.role,
        email: user.email
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
        email: user.email
      };
      const token = await this.authService.signPayload(payload);
      return { user, token};
    }


 
}
