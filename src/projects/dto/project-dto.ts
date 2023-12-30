import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBase64, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, MinLength, Validate, ValidateNested } from "class-validator";
import { ImageUrl } from "../model/project.interface";

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description?: string;
  @IsOptional()
  @IsString()
  type: string;
  @IsOptional()
  @IsString()
  projectClient?: string;
  @IsOptional()
  @IsString()
  project_date?: string;
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  imageUrl?: string[];
}

export class UpdateProjectImageDto {
  @IsNotEmpty()
  @IsString()
  clientId: string;
  @IsNotEmpty()
  @IsString()
  image: string;
  @IsOptional()
  @IsNumber()
  index: number;
}

export class UpdateProjectDto {
  @IsNotEmpty()
  @IsString()
  clientId: string;
  @IsNotEmpty()
  @IsString()
  readonly title?: string;
  @IsOptional()
  @IsString()
  readonly description?: string;
  @IsOptional()
  @IsString()
  readonly type?: string;
  @IsOptional()
  @IsString()
  readonly project_date?: string;
  @IsNotEmpty()
  @Type(() => ImageUrl || String || null)
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  imageUrl: ImageUrl[] | string[] | null[];
}
