import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { ProjectType } from "../model/content-model";
import { Type } from "class-transformer";

export class CreateClientContentDto {
  @IsNotEmpty()
  @IsString()
  clientId: string;
  @ValidateNested()
  @IsOptional()
  @IsArray()
  @Type(() => ProjectType)
  project_type: ProjectType[];
}
