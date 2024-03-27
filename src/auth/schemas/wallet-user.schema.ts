import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class WalletUser {
  @Prop({ required: true, unique: true })
  address: String;

  @Prop()
  name: String;
}

export const WalletUserSchema = SchemaFactory.createForClass(WalletUser);
