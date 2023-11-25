import { IsArray, IsBase64, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

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
}

export class ImageUrl {
  url: string;
  id: string;
}

export class UploadProjectImageDto {
  @IsNotEmpty()
  @IsString()
  clientName: string;
  @IsNotEmpty()
  @IsString()
  projectId: string;
  @IsNotEmpty()
  @IsString()
  image: string;
}
