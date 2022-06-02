import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column } from './entities/column.entity';
import { ColumnsRepository } from './columns.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Column, ColumnsRepository])],
  controllers: [ColumnsController],
  providers: [ColumnsService],
  exports: [ColumnsService],
})
export class ColumnsModule {}
