import { IsNotEmpty, IsString } from "class-validator";

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  company_name: string;
}

export class UpdateCompanyDto extends CreateCompanyDto {}
