import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { ImageUrl } from "../model/project.interface";

@Schema()
export class Project extends Document implements Project {
  @Prop({ required: true })
  clientId: string;
  @Prop({ required: false, type: Array, maxlength: 4 })
  imageUrl: ImageUrl[];
  @Prop({ required: true, minlength: 3 })
  title: string;
  @Prop({ required: true, minlength: 3 })
  description: string;
  @Prop({ required: false })
  type: string;
  @Prop({ required: false, minlength: 3 })
  projectClient: string;
  @Prop({ required: false, minlength: 3 })
  project_date: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
