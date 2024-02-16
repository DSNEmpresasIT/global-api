import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
}


export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(4)
  userName: string;
  @IsString()
  @IsOptional()
  @MinLength(4)
  clientName: string;
  @IsString()
  @IsOptional()
  @MinLength(4)
  password?: string;
  @IsString()
  @IsOptional()
  @MinLength(4)
  email: string;
}