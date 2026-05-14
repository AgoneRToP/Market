import { Category } from "@/modules/categories";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

@Schema({ versionKey: false, timestamps: true, collection: 'products' })
export class Product {
  @Prop({ type: SchemaTypes.String, required: true, min: 1, max: 255, unique: true })
  name: string;

  @Prop({ type: SchemaTypes.Number, required: true, min: 0, default: 0 })
  price: number;

  @Prop({ type: SchemaTypes.Number, required: true, min: 0, default: 0 })
  quantity: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category', required: true })
  categoryId: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);