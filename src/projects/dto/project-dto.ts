import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBase64, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, MinLength, ValidateNested } from "class-validator";
import { ImageUrl } from "../model/project.interface";

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  clientName: string;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsNotEmpty()
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
  @ArrayMaxSize(3)
  imageUrl?: string[];
}

export class UpdateProjectImageDto {
  @IsNotEmpty()
  @IsString()
  clientName: string;
  @IsNotEmpty()
  @IsString()
  image: string;
  @IsNotEmpty()
  @IsNumber()
  index: number;
}
