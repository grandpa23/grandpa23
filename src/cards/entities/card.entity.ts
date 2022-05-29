import { Column } from 'src/columns/entities/column.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column as ColumnDecorator,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'cards' })
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Column, (column) => column.cards)
  @JoinColumn()
  column: Column;

  @ColumnDecorator({ type: 'uuid' })
  columnId: Column['id'];

  @ColumnDecorator({ type: 'varchar' })
  name: string;
}
