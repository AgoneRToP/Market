import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ versionKey: false, timestamps: true, collection: 'categories' })
export class Category {
  @Prop({ type: SchemaTypes.String, required: true, min: 1, max: 255, unique: true })
  name: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category' })
  parentCategory?: Category;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
