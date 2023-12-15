import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { ProjectType } from "../model/content-model";

@Schema()
export class Content extends Document implements Content {
  @Prop({ required: true })
  clientName: string;
  @Prop({ required: false, type: Array })
  project_types: ProjectType[];
}

export const ContentSchema = SchemaFactory.createForClass(Content);
