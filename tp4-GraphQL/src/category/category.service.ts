import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../database/entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { id } });
  }

  async create(payload: { name: string }): Promise<Category> {
    const category = this.categoryRepository.create(payload);
    return this.categoryRepository.save(category);
  }
}
