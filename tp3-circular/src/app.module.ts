
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
import { Receipt } from './database/entities/receipt.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersController } from './orders/orders.controller';
import { NotificationsModule } from './notifications/notifications.module';
import { CoreModule } from './core/core.module';

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
    NotificationsModule,
    CoreModule,
  ],
  controllers: [
    AppController,      
    OrdersController,   
  ],
  providers: [
    AppService,         
  ],
})
export class AppModule {}