/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Cloudinary, Email, Facebook, ReCaptchaKeys } from '../models/CompanyCredential.interface';
@Schema()
export class CompanyCredential extends Document implements CompanyCredential {
  @Prop({ required: true })
  clientId: string;
  @Prop({ required: true, unique: true })
  clientName: string;
  @Prop({ required: false })
  supabaseUrl: string;
  @Prop({ required: false })
  supabaseKey: string;
  @Prop({ required: false, type: Object })
  facebook: Facebook;
  @Prop({ required: false })
  instagram: string;
  @Prop({ required: false, type: Object })
  recapcha: ReCaptchaKeys;
  @Prop({ required: false, type: Object })
  email: Email;
  @Prop({ required: false, type: Object })
  cloudinary: Cloudinary;
}

export const CompanyCredentialSchema = SchemaFactory.createForClass(CompanyCredential);