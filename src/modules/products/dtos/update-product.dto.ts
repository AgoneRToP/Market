import { Category } from '@/modules/categories';
import {
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @MinLength(1, {
    message: 'Название продукта должно быть не менее 1 символа',
  })
  @MaxLength(255, {
    message: 'Название продукта должно быть не более 255 символов',
  })
  name: string;

  @IsNumber()
  @Min(0, {
    message: 'Цена продукта должна быть не менее 0',
  })
  price: number;

  @IsNumber()
  @Min(0, {
    message: 'Количество продукта должно быть не менее 0',
  })
  quantity: number;

  @IsObject()
  categoryId: Category;
}
