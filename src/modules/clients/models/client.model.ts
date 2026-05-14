import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true, collection: 'clients' })
export class Client {
  @Prop({ type: String, required: true, min: 1, max: 255, unique: true })
  name: string;

  @Prop({ type: String, required: false, min: 1, max: 255, unique: true })
  email?: string;

  @Prop({ type: String, required: false, min: 1, max: 255, unique: true })
  phone?: string;

  @Prop({ type: String, required: false, min: 1, max: 255 })
  address?: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
