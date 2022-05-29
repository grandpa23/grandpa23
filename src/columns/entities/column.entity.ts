import { Card } from 'src/cards/entities/card.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column as ColumnDecorator,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'columns' })
export class Column extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ColumnDecorator({ type: 'varchar' })
  name: string;

  @OneToMany(() => Card, (card) => card.column)
  cards: Card[];
}
