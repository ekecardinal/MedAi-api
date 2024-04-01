import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Schema({ timestamps: true })
export class Consultation {
  @Prop()
  technique: String;

  @Prop()
  comparison: String;

  @Prop()
  findings: String;

  @Prop()
  impression: String;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  userId: Types.ObjectId;
}

export const ConsultationSchema = SchemaFactory.createForClass(Consultation);
