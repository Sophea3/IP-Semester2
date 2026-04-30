import { forwardRef, Module } from '@nestjs/common';
import { OrdersModule } from 'src/orders/orders.module';
import { NotificationsService } from './notifications.service';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  //imports: [forwardRef(() => OrdersModule)],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}