import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Patient {
  @Prop()
  name: String;

  @Prop()
  modality: String;

  @Prop()
  bodyPart: String;

  @Prop()
  studyDate: Date;

  @Prop()
  recieveDate: Date;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
