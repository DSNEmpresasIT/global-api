import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CloudinaryDto } from "src/company-credential/dto/company-credentials-dto";
import { Cloudinary } from "src/company-credential/models/CompanyCredential.interface";

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  company_name: string;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CloudinaryDto)
  cloudinary?: Cloudinary;
}

export class UpdateCompanyDto extends CreateCompanyDto {}
