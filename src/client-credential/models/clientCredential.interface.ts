import { Type } from "class-transformer";
import { IsNotEmpty, IsObject, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";

export class Cloudinary {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

export interface Facebook {
  tokenId: string;
  pageId: string;
}

export interface ReCaptchaKeys {
  key: string;
  secretKey: string;
}

export interface Email {
  host: string;
  user: string;
  password: string;
  port: string;
  email: string;
  emailJS?: EmailJs;
}

export interface EmailJs {
  publicKey: string;
  service: string;
  contactTemplate: string;
}


export class ClientCredential {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly clientName: string;
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
  readonly email?: Email;
  @ValidateNested({ each: true })
  @Type(() => Cloudinary)
  @IsOptional()
  @IsObject()
  readonly cloudinary?: Cloudinary;
}
