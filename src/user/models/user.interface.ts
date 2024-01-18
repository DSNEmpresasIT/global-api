import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
}


export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  userName: string;
}