import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Category } from '../models';

export class UpdateCategoryDto {
  @IsString()
  @MinLength(1, {
    message: 'Название категории должно быть не менее 1 символа',
  })
  @MaxLength(255, {
    message: 'Название категории должно быть не более 255 символов',
  })
  name: string;

  @IsOptional()
  @IsString()
  parentCategory?: Category;
}
