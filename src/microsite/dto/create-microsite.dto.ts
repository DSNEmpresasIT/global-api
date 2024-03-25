import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateMicrositeDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => AboutTypeDto)
  about: AboutTypeDto;
  @IsOptional()
  @ValidateNested()
  @Type(() => BannerTypeDto)
  banner: BannerTypeDto;
  @IsOptional()
  @ValidateNested()
  @Type(() => ContactTypeDto)
  contact_component: ContactTypeDto;
  @IsOptional()
  @ValidateNested()
  @Type(() => CarouselTypeDto)
  carousel: CarouselTypeDto;
  @IsOptional()
  @ValidateNested()
  @Type(() => CompanyInfoTypeDto)
  company_info: CompanyInfoTypeDto;
}

export class AboutTypeDto {
  @IsNotEmpty()
  @IsNumber()
  type: number;
  @IsNotEmpty()
  @IsString()
  badge: string;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  image_1: string;
  @IsNotEmpty()
  @IsString()
  image_2: string;
}

export class BannerTypeDto {
  @IsNotEmpty()
  type: number;
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  video_link: string;
  @IsNotEmpty()
  images: string[];
};

export class ContactTypeDto {
  @IsNotEmpty()
  @IsNumber()
  type: number;
  @IsNotEmpty()
  @IsString()
  google_map_src: string;
};

export class CarouselTypeDto {
  @IsNotEmpty()
  @IsNumber()
  type: number;
  images: string[];
};

export class CompanyInfoTypeDto {
  @IsNotEmpty()
  @IsNumber()
  type: number;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  cards: string[];
}
