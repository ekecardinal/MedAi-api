import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: String;

  @Prop({ unique: [true, 'User already exists'] })
  email: String;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
