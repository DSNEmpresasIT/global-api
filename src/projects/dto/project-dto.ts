import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBase64, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, MinLength, Validate, ValidateNested } from "class-validator";
import { ImageUrl } from "../model/project.interface";
import { ProjectType } from "src/cms/entity/project_types.entity";

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description?: string;
  @IsOptional()
  @IsNumber()
  project_type_id: number;
  @IsOptional()
  @IsString()
  project_client?: string;
  @IsOptional()
  @IsString()
  project_date?: string;
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  images?: string[];
}

export class UpdateProjectImageDto {
  @IsNotEmpty()
  @IsNumber()
  companyId: number;
  @IsNotEmpty()
  @IsString()
  image: string;
  @IsNotEmpty()
  @IsString()
  project_client: string;
  @IsOptional()
  @IsNumber()
  index: number;
}

export class UpdateProjectDto {
  @IsNotEmpty()
  @IsNumber()
  companyId: number;
  @IsNotEmpty()
  @IsString()
  readonly title?: string;
  @IsOptional()
  @IsString()
  readonly description?: string;
  @IsOptional()
  @IsNumber()
  readonly type?: number;
  @IsOptional()
  @IsString()
  readonly project_date?: string;
  @IsOptional()
  @IsString()
  readonly project_client?: string;
  @IsNotEmpty()
  @Type(() => ImageUrl || String || null)
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  images: ImageUrl[] | string[] | null[];
}
