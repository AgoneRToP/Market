import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../products.service';

describe('ProductsService', () => {
  let productService: ProductService;

  const productMockModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: 'ProductModel', useValue: productMockModel },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    jest.clearAllMocks();
  });

  // ─── getAll ──────────────────────────────────────────────────────────────────

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });
});
