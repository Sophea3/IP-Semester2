import { Resolver, Query, Mutation, Args, ResolveField, Parent, Int, Float } from '@nestjs/graphql';
import { ProductService } from '../../product/product.service';
import { CategoryService } from '../../category/category.service';
import { ProductType } from '../types/product.type';
import { CategoryType } from '../types/category.type';

@Resolver(() => ProductType)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  // ✅ Get all products
  @Query(() => [ProductType])
  async products(): Promise<ProductType[]> {
    return this.productService.findAll();
  }

  // ✅ Get one product by id
  @Query(() => ProductType, { nullable: true })
  async product(@Args('id', { type: () => Int }) id: number): Promise<ProductType | null> {
    const product = this.productService.findOne(id);
    return product || null;
  }

  // ✅ Create product
  @Mutation(() => ProductType)
  async createProduct(
    @Args('name') name: string,
    @Args('price', { type: () => Float }) price: number,
    @Args('categoryId', { type: () => Int }) categoryId: number,
  ): Promise<ProductType> {
    return this.productService.create({
      name,
      price,
      categoryId,
    });
  }

  // ✅ Resolve relation: Product -> Category
  @ResolveField(() => CategoryType, { nullable: true })
  async category(@Parent() product: ProductType): Promise<CategoryType | null> {
    return this.categoryService.findOne(product.categoryId);
  }

  // ✅ Challenge: productsByCategory
  @Query(() => [ProductType])
  async productsByCategory(
    @Args('categoryId', { type: () => Int }) categoryId: number,
  ): Promise<ProductType[]> {
    return this.productService.findByCategory(categoryId);
  }
}