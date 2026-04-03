import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptsModule } from './receipts/receipts.module';
import { Receipt } from './database/entities/receipt.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
import { CoreModule } from './core/core.module';
import { OrdersModule } from './orders/orders.module'; // ✅ IMPORT MODULE

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
    OrdersModule, // ✅ ADD THIS
  ],
  controllers: [
    AppController, // ✅ ONLY controllers here
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}