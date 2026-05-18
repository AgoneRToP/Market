import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CategoryModule,
  ClientsModule,
  InvoicesModule,
  ProductModule,
} from './modules';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env',
      // load: [configuration],

      validate(config) {
        if (!config.MONGO_URL) {
          throw new Error('MONGO_URL не установлена в файле .env');
        }
        return config;
      },
    }),
    MongooseModule.forRoot(process.env.MONGO_URL as string),
    CategoryModule,
    ProductModule,
    ClientsModule,
    InvoicesModule,
  ],
})
export class AppModule {}
