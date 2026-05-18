import { Injectable } from '@nestjs/common';
import { Invoice } from './models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateInvoiceDto, UpdateInvoiceDto } from './dtos';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice.name) private readonly invoiceModel: Model<Invoice>,
  ) {}

  async getAll() {
    const data = await this.invoiceModel.find();

    return {
      success: true,
      data,
    };
  }

  async getOne(id: string) {
    const data = await this.invoiceModel.findById(id);

    return {
      success: true,
      data,
    };
  }

  async create(payload: CreateInvoiceDto) {
    const data = await this.invoiceModel.create(payload);

    return {
      success: true,
      data,
    };
  }

  async update(id: string, payload: UpdateInvoiceDto) {
    const data = await this.invoiceModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );

    return {
      success: true,
      data,
    };
  }

  async delete(id: string) {
    const data = await this.invoiceModel.findByIdAndDelete(id);

    return {
      success: true,
      data,
    };
  }
}
