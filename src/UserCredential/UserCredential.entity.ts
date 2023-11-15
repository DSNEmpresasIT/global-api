import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class UserCredential extends Document {
  @Prop({ required: true })
  clientId: string;

  @Prop({ required: false })
  supabaseUrl: string;

  @Prop({ required: false })
  supabaseKey: string;

  @Prop({ required: false })
  facebook: {
    tokenId: string;
    pageId: string;
  };

  @Prop({ required: false })
  instagram: string;

  @Prop({ required: false })
  recapchap: {
    key: string;
    secretKey: string;
  };

  @Prop({ required: false })
  email: {
    host: string;
    user: string;
    password: string;
    port: string;
    emailJs: {
      publicKey: string;
      service: string;
      contactTemplate: string;
    };
  };
}
export const UserCredentialSchema =
  SchemaFactory.createForClass(UserCredential);
