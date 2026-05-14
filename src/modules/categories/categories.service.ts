import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './models';
import { Model } from 'mongoose';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async getAll() {
    const data = await this.categoryModel
      .find()
      .populate('parentCategory', 'name');

    return {
      success: true,
      data,
    };
  }

  async getOne(id: string) {
    const data = await this.categoryModel
      .findById(id)
      .populate('parentCategory', 'name');

    if (!data) throw new NotFoundException('Категория не найдена');

    return {
      success: true,
      data,
    };
  }

  async create(payload: CreateCategoryDto) {
    const existing = await this.categoryModel.findOne({ name: payload.name });

    if (existing)
      throw new NotFoundException('Категория с таким названием уже существует');

    const data = await this.categoryModel.create(payload);

    return {
      success: true,
      data,
    };
  }

  async update(id: string, payload: UpdateCategoryDto) {
    const existing = await this.categoryModel.findOne({ name: payload.name });

    if (existing && existing._id.toString() !== id)
      throw new NotFoundException('Категория с таким названием уже существует');

    const data = await this.categoryModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );

    if (!data) throw new NotFoundException('Категория не найдена');

    return {
      success: true,
      data,
    };
  }

  async delete(id: string) {
    const data = await this.categoryModel.findByIdAndDelete(id).exec();
    
    if (!data) throw new NotFoundException('Категория не найдена');

    return {
      success: true,
      message: 'Категория успешно удалена',
    };
  }
}
