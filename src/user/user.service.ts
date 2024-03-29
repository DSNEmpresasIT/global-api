import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from 'src/user/models/user.interface';
import { RegisterDto } from './dto/register.dto';
import { LoginDTO } from 'src/auth/dto/auth-dto';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/auth/types/payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { User } from './schemas/User.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(RegisterDto: RegisterDto) {
    try {
      const createdUser = this.userRepo.create(RegisterDto);
      await this.userRepo.save(createdUser);
      
      // return this.sanitizeUser(createdUser);
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.message);
    }
  }

  async findByLogin(UserDTO: LoginDTO) {
    try {
      // const { email, password } = UserDTO;
      // const user = await this.userRepo.findOne({ 
      //   where: {
      //     email
      //   }
      //  });
      const user = await this.userModel.findOne({  
        email: UserDTO.email
      }).lean()

      if (!user) {
        throw new BadRequestException('User does not exist');
      }

      if (await bcrypt.compare(UserDTO.password, user.password)) {
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
    return {
      ...user,
      password: undefined
    };
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
  
  async getAllUsers() {
    try {

      return await this.userModel.find().select([
        'email', 
        '_id', 
        'clientName', 
        'userName', 
        'role'
      ]);
    } catch (error) {
      throw new BadGatewayException('Error in getAllUsers:', error);
    }
  }

  async getUserData(userId: string) {
    try {
      
      return await this.userModel.findOne({ _id: userId }).select([
        'email', 
        '_id', 
        'clientName', 
        'userName', 
        'role'
      ]);
    } catch (error) {
      throw new BadGatewayException(`Error in getUserData: ${error.message}`);
    }
  }

  // async deleteUser(userId: string) {
  //   try {
  //     return await this.userModel.deleteOne({ _id: userId })
  //   } catch (error) {
  //     throw new BadGatewayException('Error in deleteUser: ', error)
  //   }
  // }
}
