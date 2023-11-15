import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class ClientCredential extends Document {
  @Prop({ required: true })
  clientId: string;

  @Prop({ required: false })
  supabaseUrl: string;

  @Prop({ required: false })
  supabaseKey: string;

  @Prop({ required: false, type: Object })
  facebook: {
    tokenId: string;
    pageId: string;
  };

  @Prop({ required: false })
  instagram: string;

  @Prop({ required: false, type: Object })
  recapchap: {
    key: string;
    secretKey: string;
  };

  @Prop({ required: false, type: Object })
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
export const ClientCredentialSchema =
  SchemaFactory.createForClass(ClientCredential);