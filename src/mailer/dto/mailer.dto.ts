import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class SendEmailDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;
  @IsString()
  @IsNotEmpty()
  from: string;
  @IsString()
  @IsNotEmpty()
  subject: string;
  @IsString()
  @IsNotEmpty()
  message: string;
}