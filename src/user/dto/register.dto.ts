import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { RolesTypes } from "src/auth/decorators/roles.interface";

export class RegisterDto {
  @IsOptional()
  @IsString()
  role: RolesTypes;
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
