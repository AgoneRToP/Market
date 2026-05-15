import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../categories.controller';
import { CategoryService } from '../categories.service';

describe('CategoriesController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;

  const mockCategoryService = {
    getAll: jest.fn(),
    getOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  // ─── getAll ──────────────────────────────────────────────────────────────────

  it('should call getAll method of service', async () => {
    const data = [
      { id: '1', name: 'Category 1' },
      { id: '2', name: 'Category 2' },
    ];
    const responseData = {
      success: true,
      data
    };

    mockCategoryService.getAll.mockResolvedValue(responseData);
    const result = await categoryController.getAll();

    expect(result.success).toEqual(true);
    expect(result.data).toEqual(data);
    expect(categoryService.getAll).toHaveBeenCalled();
  });

  // ─── getOne ──────────────────────────────────────────────────────────────────

  it('should call getOne method of service', async () => {
    const data = { id: '1', name: 'Category 1' };
    const responseData = {
      success: true,
      data
    };
    
    mockCategoryService.getOne.mockResolvedValue(responseData);
    const result = await categoryController.getOne('1');

    expect(result.success).toEqual(true);
    expect(result.data).toEqual(data);
    expect(categoryService.getOne).toHaveBeenCalledWith('1');
  });

  // ─── create ──────────────────────────────────────────────────────────────────

  it('should call create method of service', async () => {
    const createDto = { name: 'New Category' };
    const data = { id: '1', name: 'New Category' };
    const responseData = {
      success: true,
      data
    };

    mockCategoryService.create.mockResolvedValue(responseData);
    const result = await categoryController.create(createDto);

    expect(result.success).toEqual(true);
    expect(result.data).toEqual(data);
    expect(categoryService.create).toHaveBeenCalledWith(createDto);
  });

  // ─── update ──────────────────────────────────────────────────────────────────
  
  it('should call update method of service', async () => {
    const updateDto = { name: 'Updated Category' };
    const data = { id: '1', name: 'Updated Category' };
    const responseData = {
      success: true,
      data
    };
    mockCategoryService.update.mockResolvedValue(responseData);
    const result = await categoryController.update('1', updateDto);
    
    expect(result.success).toEqual(true);
    expect(result.data).toEqual(data);
    expect(categoryService.update).toHaveBeenCalledWith('1', updateDto);
  });

  // ─── delete ──────────────────────────────────────────────────────────────────

  it('should call delete method of service', async () => {
    const responseData = {
      success: true,
      message: 'Категория успешно удалена'
    };
    mockCategoryService.delete.mockResolvedValue(responseData);
    const result = await categoryController.delete('1');
    
    expect(result.success).toEqual(true);
    expect(result.message).toEqual('Категория успешно удалена');
    expect(categoryService.delete).toHaveBeenCalledWith('1');
  });
});
