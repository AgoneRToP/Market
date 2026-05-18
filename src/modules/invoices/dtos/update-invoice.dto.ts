import { Client } from '@/modules/clients';
import { Product } from '@/modules/products';
import { IsInt, IsObject, IsString } from 'class-validator';

export class UpdateInvoiceDto {
  @IsInt()
  orderId: number;

  @IsObject()
  @IsString()
  clientName: Client;

  @IsObject()
  @IsString()
  productName: Product;

  @IsInt()
  totalPrice: number;
}
