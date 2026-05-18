import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { App } from 'supertest/types';
import request from 'supertest';

describe('AppController', async () => {
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
    if (process.env.NODE_ENV === 'test') {
      const collections = mongooseConnection.collections;
      for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
      }
    }
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('/categories (GET)', async () => {
    const registerResponse = await request(app.getHttpServer())
      .post('/categories')
      .send({
        
      })


  })

  afterEach(async () => {
    if (mongooseConnection) await mongooseConnection.close();
    await app.close();
  });
});
