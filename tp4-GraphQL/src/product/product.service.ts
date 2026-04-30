import { Injectable } from '@nestjs/common';

export type Product = {
  id: number;
  name: string;
  price: number;
  categoryId: number;
};

@Injectable()
export class ProductService {
  private products: Product[] = [];
  private nextId = 1;

  // ✅ Get all products
  findAll(): Product[] {
    return this.products;
  }

  // ✅ Get one product by id
  findOne(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  // ✅ Create product
  create(payload: { name: string; price: number; categoryId: number }): Product {
    const product: Product = {
      id: this.nextId++,
      name: payload.name,
      price: payload.price,
      categoryId: payload.categoryId,
    };

    this.products.push(product);
    return product;
  }

  // ✅ NEW: Get products by category (for your challenge)
  findByCategory(categoryId: number): Product[] {
    return this.products.filter((p) => p.categoryId === categoryId);
  }

  // ✅ (Optional) Delete product
  remove(id: number): boolean {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return false;

    this.products.splice(index, 1);
    return true;
  }

  // ✅ (Optional) Update product
  update(
    id: number,
    payload: { name?: string; price?: number; categoryId?: number },
  ): Product | undefined {
    const product = this.findOne(id);
    if (!product) return undefined;

    if (payload.name !== undefined) product.name = payload.name;
    if (payload.price !== undefined) product.price = payload.price;
    if (payload.categoryId !== undefined) product.categoryId = payload.categoryId;

    return product;
  }
}