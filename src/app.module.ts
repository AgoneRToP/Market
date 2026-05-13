import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './modules';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      
      validate(config) {
        if (!config.MONGO_URL) {
          throw new Error('MONGO_URL не установлена в файле .env');
        }
        return config;
      },
    }),
    MongooseModule.forRoot(process.env.MONGO_URL as string),
    CategoryModule,
  ],
})
export class AppModule {}
