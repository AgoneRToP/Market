import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CategoryService } from '../categories.service';

describe('CategoriesService', () => {
  let categoryService: CategoryService;

  const categoryMockModel = {
    find:              jest.fn(),
    findById:          jest.fn(),
    findOne:           jest.fn(),
    create:            jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: 'CategoryModel', useValue: categoryMockModel },
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    jest.clearAllMocks();
  });

  // ─── getAll ──────────────────────────────────────────────────────────────────

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  it('should return all categories', async () => {
    const categories = [{ name: 'Category 1' }, { name: 'Category 2' }];

    // find().populate(...) — chain stops at populate
    categoryMockModel.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue(categories),
    });

    const result = await categoryService.getAll();

    expect(result).toEqual({ success: true, data: categories });
    expect(categoryMockModel.find).toHaveBeenCalled();
  });

  // ─── getOne ──────────────────────────────────────────────────────────────────

  it('should return a single category', async () => {
    const category = { name: 'Category 1' };

    // findById().populate(...) — chain stops at populate
    categoryMockModel.findById.mockReturnValue({
      populate: jest.fn().mockResolvedValue(category),
    });

    const result = await categoryService.getOne('1');

    expect(result).toEqual({ success: true, data: category });
    expect(categoryMockModel.findById).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException when category not found', async () => {
    categoryMockModel.findById.mockReturnValue({
      populate: jest.fn().mockResolvedValue(null),
    });

    await expect(categoryService.getOne('999')).rejects.toThrow(NotFoundException);
    await expect(categoryService.getOne('999')).rejects.toThrow('Категория не найдена');
  });

  // ─── create ──────────────────────────────────────────────────────────────────

  it('should create a category', async () => {
    const dto = { name: 'New Category' };
    const created = { _id: '1', ...dto };

    // findOne returns null → no duplicate
    categoryMockModel.findOne.mockResolvedValue(null);
    categoryMockModel.create.mockResolvedValue(created);

    const result = await categoryService.create(dto);

    expect(result).toEqual({ success: true, data: created });
    expect(categoryMockModel.findOne).toHaveBeenCalledWith({ name: dto.name });
    expect(categoryMockModel.create).toHaveBeenCalledWith(dto);
  });

  it('should throw NotFoundException if category name already exists on create', async () => {
    const dto = { name: 'Existing Category' };

    // findOne returns an existing doc → duplicate
    categoryMockModel.findOne.mockResolvedValue({ _id: '1', ...dto });

    await expect(categoryService.create(dto)).rejects.toThrow(NotFoundException);
    await expect(categoryService.create(dto)).rejects.toThrow(
      'Категория с таким названием уже существует',
    );
    expect(categoryMockModel.create).not.toHaveBeenCalled();
  });

  // ─── update ──────────────────────────────────────────────────────────────────

  it('should update a category', async () => {
    const dto = { name: 'Updated Category' };
    const updated = { _id: '1', ...dto };

    // findOne returns null → no name conflict
    categoryMockModel.findOne.mockResolvedValue(null);
    categoryMockModel.findByIdAndUpdate.mockResolvedValue(updated);

    const result = await categoryService.update('1', dto);
    expect(result).toEqual({ success: true, data: updated });
    expect(categoryMockModel.findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      { $set: dto },
      { new: true },
    );
  });

  it('should throw NotFoundException if name belongs to a different category on update', async () => {
    const dto = { name: 'Taken Name' };

    // findOne returns a DIFFERENT doc (_id !== target id)
    categoryMockModel.findOne.mockResolvedValue({
      _id: { toString: () => '999' },
      name: dto.name,
    });

    await expect(categoryService.update('1', dto)).rejects.toThrow(NotFoundException);
    await expect(categoryService.update('1', dto)).rejects.toThrow(
      'Категория с таким названием уже существует',
    );
  });

  it('should throw NotFoundException if category to update does not exist', async () => {
    const dto = { name: 'Ghost Category' };

    categoryMockModel.findOne.mockResolvedValue(null);
    categoryMockModel.findByIdAndUpdate.mockResolvedValue(null);

    await expect(categoryService.update('999', dto)).rejects.toThrow(NotFoundException);
    await expect(categoryService.update('999', dto)).rejects.toThrow('Категория не найдена');
  });

  // ─── delete ──────────────────────────────────────────────────────────────────

  it('should delete a category', async () => {
    const deleted = { _id: '1', name: 'Category 1' };

    // findByIdAndDelete().exec() — chain stops at exec
    categoryMockModel.findByIdAndDelete.mockReturnValue({
      exec: jest.fn().mockResolvedValue(deleted),
    });

    const result = await categoryService.delete('1');

    expect(result).toEqual({ success: true, message: 'Категория успешно удалена' });
    expect(categoryMockModel.findByIdAndDelete).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException when category to delete does not exist', async () => {
    categoryMockModel.findByIdAndDelete.mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });

    await expect(categoryService.delete('999')).rejects.toThrow(NotFoundException);
    await expect(categoryService.delete('999')).rejects.toThrow('Категория не найдена');
  });
});