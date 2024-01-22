import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import { RolesTypes } from 'src/auth/decorators/roles.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends mongoose.Document implements User {
  @Prop({ required: true, type: String })
  userName: string;
  @Prop({ required: true, type: String, unique: true })
  clientName: string;
  @Prop({ required: true, type: String, unique: true })
  email: string;
  @Prop({ required: true, type: String, unique: true })
  password: string;
  @Prop({ required: false, default: RolesTypes.CUSTOMER, type: () => RolesTypes })
  role: RolesTypes;
};

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre('save', async function (next: NextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
