import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export interface QueryParamsGetSitemap {
  projects?: string;
}

export class GetSiteMapDto {
  @IsNotEmpty()
  @IsString()
  pageUrl: string;
  @IsNotEmpty()
  @IsArray()
  @Type(() => String)
  staticPaths: string[];
  @IsNotEmpty()
  @ValidateNested()
  dynamicPaths: {
    projects: string;
  };
}
