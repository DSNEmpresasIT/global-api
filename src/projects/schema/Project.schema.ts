import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Project extends Document implements Project {
  @Prop({ required: true })
  clientName: string;
  @Prop({ required: false, type: Array })
  imgUrl: string[];
  @Prop({ required: false })
  title: string;
  @Prop({ required: false })
  description: string;
  @Prop({ required: false })
  type: string;
  @Prop({ required: false })
  projectClient: string;
  @Prop({ required: false })
  project_date: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
