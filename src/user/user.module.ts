import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/User.schema';
import  { User as Userentity } from './entity/user.entity'
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [
    CompanyModule,
    MongooseModule.forFeature([
      { 
        name: User.name, 
        schema: UserSchema 
      }
    ]),
    TypeOrmModule.forFeature([Userentity])
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})

export class UserModule {}
