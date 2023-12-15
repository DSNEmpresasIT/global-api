import { IsNotEmpty, IsString } from "class-validator";

export class ProjectType {
  @IsNotEmpty()
  @IsString()
  value: string;
  label: string;
}