import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private service: ProductService) {}

  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.service.getOne(id);
  }

  @Post()
  async create(@Body() payload: CreateProductDto) {
    return await this.service.create(payload);
  }

  @Put(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return await this.service.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.service.delete(id);
  }
}
