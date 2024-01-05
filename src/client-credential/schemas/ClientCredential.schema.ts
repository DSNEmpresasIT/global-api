/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Cloudinary, Email, Facebook, ReCaptchaKeys } from '../models/clientCredential.interface';
@Schema()
export class ClientCredential extends Document implements ClientCredential {
  @Prop({ required: true })
  clientId: string;
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

export const ClientCredentialSchema = SchemaFactory.createForClass(ClientCredential);