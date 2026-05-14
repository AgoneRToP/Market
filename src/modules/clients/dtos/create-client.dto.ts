import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @MinLength(1, {
    message: 'Имя клиента должно быть не менее 1 символа',
  })
  @MaxLength(255, {
    message: 'Имя клиента должно быть не более 255 символов',
  })
  name: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsPhoneNumber(undefined)
  @IsOptional()
  phone: string;

  @IsString()
  @MinLength(1, {
    message: 'Адрес клиента должен быть не менее 1 символа',
  })
  @MaxLength(255, {
    message: 'Адрес клиента должен быть не более 255 символов',
  })
  @IsOptional()
  address: string;
}
