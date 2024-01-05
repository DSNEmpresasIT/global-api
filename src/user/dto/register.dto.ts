import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RegisterDto {
  @IsOptional()
  @IsString()
  role: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  userName: string;
}
