import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from './models';
import { Model } from 'mongoose';
import { CreateClientDto } from './dtos';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private readonly clientsModel: Model<Client>,
  ) {}

  async getAll() {
    const data = await this.clientsModel.find();

    return {
      success: true,
      data,
    };
  }

  async getOne(id: string) {
    const data = await this.clientsModel.findById(id);

    return {
      success: true,
      data,
    };
  }

  async create(payload: CreateClientDto) {
    const data = await this.clientsModel.create(payload);

    return {
      success: true,
      data,
    };
  }

  async update(id: string, payload: CreateClientDto) {
    const data = await this.clientsModel.findByIdAndUpdate(
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
    await this.clientsModel.findByIdAndDelete(id);

    return {
      success: true,
    };
  }
}
