import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from '../../category/category.service';
import { CategoryType } from '../types/category.type';

@Resolver(() => CategoryType)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [CategoryType])
  async categories() {
    return this.categoryService.findAll();
  }

  @Mutation(() => CategoryType)
  async createCategory(@Args('name') name: string) {
    return this.categoryService.create({ name });
  }
}