import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class UserCredential extends Document {
  @Prop({ required: true })
  USER_ID: string;

  @Prop({ required: true })
  SUPABASE_URL: string;

  @Prop({ required: true })
  SUPABASE_KEY: string;

  @Prop({ required: false })
  FACEBOOK: {
    TOKEN_ID: string;
    PAGE_ID: string;
  };

  @Prop({ required: false })
  INSTAGRAM: string;

  @Prop({ required: false })
  RECAPCHAP: {
    KEY: string;
    SECRET_KEY: string;
  };

  @Prop({ required: false })
  EMAIL: {
    HOST: string;
    USER: string;
    PASSWORD: string;
    PORT: string;
    EMAILJS: {
      PUBLIC_KEY: string;
      SERVICE: string;
      CONTACT_TEMPLATE: string;
    };
  };
}
export const UserCredentialSchema =
  SchemaFactory.createForClass(UserCredential);
