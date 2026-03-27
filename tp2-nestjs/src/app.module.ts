
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ReceiptsModule } from './receipts/receipts.module';
// import { Receipt } from './database/entities/receipt.entity';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'sqlite', // or your DB type
//       database: 'db.sqlite',
//      entities: [Receipt],
//      synchronize: true, // for dev only
//    }),
//     ReceiptsModule,
//   ],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptsModule } from './receipts/receipts.module';
import { Receipt } from './database/entities/receipt.entity';// ✅ import your controller
import { OrdersController } from './orders/orders.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'mydb',
      entities: [Receipt],
      synchronize: true,
    }),
    ReceiptsModule,
  ],
  controllers: [OrdersController], // ✅ register your controller here
  providers: [],
})
export class AppModule {}