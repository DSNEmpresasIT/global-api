import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  clientName: string;
  @IsOptional()
  @IsString()
  role: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
