import { Controller, Post, Get, Body } from '@nestjs/common';

@Controller('orders') // base route: /orders
export class OrdersController {
  // Temporary in-memory storage for orders
  private orders: any[] = [];

  // GET /orders — return all orders
  @Get()
  findAll() {
    console.log('[GET /orders]');
    return { message: 'Orders retrieved', orders: this.orders };
  }

  // POST /orders — create a new order
  @Post()
  create(@Body() createOrderDto: any) {
    console.log('[POST /orders]', createOrderDto);
    this.orders.push(createOrderDto); // store in memory
    return { message: 'Order created', order: createOrderDto };
  }
}