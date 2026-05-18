import { Client } from "@/modules/clients";
import { Product } from "@/modules/products";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

@Schema({ versionKey: false, timestamps: true, collection: 'invoices' })
export class Invoice {
    @Prop({ type: SchemaTypes.Number, required: true, min: 0, unique: true, index: true, default: 0})
    orderId: number;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Product', required: true })
    productName: Product;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Client', required: true })
    clientName: Client;

    @Prop({ type: SchemaTypes.Number, required: true, min: 0 })
    totalPrice: number;

    @Prop({ type: SchemaTypes.Date, default: Date.now })
    issuedAt: Date;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
