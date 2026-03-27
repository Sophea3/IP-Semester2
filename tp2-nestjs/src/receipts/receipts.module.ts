import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';
import { Receipt } from '../database/entities/receipt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt])], // ✅ important
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
})
export class ReceiptsModule {}