import { IsNotEmpty, IsObject, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { Cloudinary, Email, EmailJs, Facebook, ReCaptchaKeys } from "../models/CompanyCredential.interface";
import { Type } from "class-transformer";

export class CreateCompanyCredentialDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly supabaseUrl?: string;
  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly supabaseKey?: string;
  @ValidateNested({ each: true })
  @IsOptional()
  @IsObject()
  readonly facebook?: Facebook;
  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly instagram?: string;
  @ValidateNested({ each: true })
  @IsOptional()
  @IsObject()
  readonly recapcha?: ReCaptchaKeys;
  @ValidateNested({ each: true })
  @IsOptional()
  @IsObject()
  @Type(() => EmailDto)
  readonly email?: Email;
  @ValidateNested({ each: true })
  @Type(() => CloudinaryDto)
  @IsOptional()
  @IsObject()
  readonly cloudinary?: Cloudinary;
}

export class UpdateCompanyCredentialDto extends CreateCompanyCredentialDto {}

class EmailDto {
  @IsString()
  @IsNotEmpty()
  host: string;
  @IsString()
  @IsNotEmpty()
  user: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  port: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  emailJS?: EmailJs;
}

class CloudinaryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly cloud_name: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly api_key: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly api_secret: string;
}
