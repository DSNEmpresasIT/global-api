import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Repository } from 'typeorm';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UpdateUserDto, User } from 'src/user/models/user.interface';
import { RegisterDto } from './dto/register.dto';
import { LoginDTO } from 'src/auth/dto/auth-dto';
import { Payload } from 'src/auth/types/payload.interface';
import { User as Userentity } from './entity/user.entity';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectRepository(Userentity) private readonly userRepo: Repository<Userentity>,
    private readonly companyService: CompanyService,
  ) {}

  async create(company_id: number, RegisterDto: RegisterDto) {
    try {
      const company =  await this.companyService.getCompanyById(company_id);
      
      if (!company) {
        throw new BadRequestException('Does not exists a company with that ID');
      }

      const passwordHashed = await bcrypt.hash(RegisterDto.password, 10);
      const createdUser = this.userRepo.create({ 
        ...RegisterDto,
        password: passwordHashed, 
        clientName: company.company_name,
        company,
        role: RegisterDto.role ?? undefined
      });

      await this.userRepo.save(createdUser);
      
      return this.sanitizeUser(createdUser);
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.message);
    }
  }

  async findByLogin(UserDTO: LoginDTO) {
    try {
      const user = await Userentity.findOne({  
        where: { email: UserDTO.email }
      })

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
  sanitizeUser(user: Userentity) {
    return {
      ...user,
      password: undefined
    };
  }

  async findByPayload(payload: Payload) {
    try {
      const { email } = payload;

      return await this.userRepo.findOne({ where: { email } });
    } catch (error) {
      throw new BadRequestException(`Error in UserService.findByPayload: ${error.message}`);
    }
  }

  async updateUser(userId: number, body: UpdateUserDto) {
    try {
      const user = await Userentity.findOne({ where: { id: userId } })

      if (!user) {
        throw new BadRequestException('User does not exists')
      }
      
      user.email = body.email;
      user.clientName = body.clientName;
      user.userName = body.userName;

      if (body.password) {
        user.password =  await bcrypt.hash(body.password, 10)
      }
    
      await user.save()
      return {
        ...user,
        password: undefined
      }
    } catch (error) {
      throw new BadGatewayException(`Error in #updateUser service: ${error}`)
    }
  }
  
  async getAllUsers() {
    try {
      return await this.userRepo.find({
        relations: ['company'],
        select: {
          company: {
            id: true,
            company_name: true
          },
          userName: true,
          role: true,
          email: true
        }
      })
    } catch (error) {
      console.log(error)
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
