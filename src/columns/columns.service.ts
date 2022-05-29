import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ColumnsRepository } from './columns.repository';
import { Column } from './entities/column.entity';

@Injectable()
export class ColumnsService extends TypeOrmCrudService<Column> {
  constructor(public readonly repo: ColumnsRepository) {
    super(repo);
  }
}
