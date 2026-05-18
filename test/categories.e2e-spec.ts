import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { App } from 'supertest/types';

describe('CategoriesController', async () => {
  let app: INestApplication<App>;
  let mongooseConnection: Connection;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();

    await app.init();

    mongooseConnection = app.get<Connection>('DatabaseConnection');
  });

  beforeEach(async () => {

  })

  // it('/categories (GET)', async () => {
  //   return request(app.getHttpServer()).get()
  // })

  afterEach(async () => {
    if (mongooseConnection) await mongooseConnection.close();
    await app.close();
  });
});
