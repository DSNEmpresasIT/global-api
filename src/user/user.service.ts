import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto, User } from 'src/user/models/user.interface';
import { RegisterDto } from './dto/register.dto';
import { LoginDTO } from 'src/auth/dto/auth-dto';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/auth/types/payload.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(RegisterDto: RegisterDto) {
    try {
      const { email } = RegisterDto;
      const user = await this.userModel.findOne({ email });
      if (user) {
        throw new BadRequestException('User already exists');
      }
      const createdUser = new this.userModel(RegisterDto);
      await createdUser.save();
      return this.sanitizeUser(createdUser);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByLogin(UserDTO: LoginDTO) {
    try {
      const { email, password } = UserDTO;
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new BadRequestException('User does not exist');
      }
      if (await bcrypt.compare(password, user.password)) {
        return this.sanitizeUser(user);
      } else {
        throw new BadRequestException('Invalid credentials');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // return user object without password
  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async findByPayload(payload: Payload) {
    try {
      const { email } = payload;
      return await this.userModel.findOne({ email });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(userId: string, body: UpdateUserDto) {
    try {
      let newSettings: UpdateUserDto = {
        email: body.email,
        userName: body.userName,
      } 
      
      if (body.password) newSettings.password =  await bcrypt.hash(body.password, 10);
    
      return this.userModel.updateOne({ _id: userId }, { $set: newSettings });
    } catch (error) {
      throw new BadGatewayException('Error in #updateUser service:', error)
    }
  }
}
