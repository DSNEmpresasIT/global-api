import { IsNotEmpty, IsString } from "class-validator";

export class ProjectType {
  @IsNotEmpty()
  @IsString()
  name: string;
  filter: string;
}