import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './models';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from './dtos';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async getAll() {
    const data = await this.productModel.find();
    
    return {
      success: true,
      data,
    };
  }

  async getOne(id: string) {
    const data = await this.productModel.findById(id);

    if (!data) throw new NotFoundException('Продукт не найден');

    return {
      success: true,
      data,
    };
  }

  async create(payload: CreateProductDto) {
    const existing = await this.productModel.findOne({ name: payload.name });

    if (existing)
      throw new NotFoundException('Продукт с таким названием уже существует');

    const data = await this.productModel.create(payload);

    return {
      success: true,
      data,
    };
  }

  async update(id: string, payload: UpdateProductDto) {
    const existing = await this.productModel.findOne({ name: payload.name });

    if (existing && existing._id.toString() !== id)
      throw new NotFoundException('Продукт с таким названием уже существует');

    const data = await this.productModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );

    if (!data) throw new NotFoundException('Продукт не найден');

    return {
      success: true,
      data,
    };
  }

  async delete(id: string) {
    const data = await this.productModel.findByIdAndDelete(id);

    if (!data) throw new NotFoundException('Продукт не найден');

    return {
      success: true,
      data,
    };
  }
}
