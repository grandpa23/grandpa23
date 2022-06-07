import { User } from '../../users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'notes' })
export class Note {
  @ApiProperty({ description: 'Id поста', nullable: false })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: 'Автор поста', nullable: false })
  @ManyToOne(() => User, (user) => user.notes)
  user?: User;

  @ApiProperty({ description: 'Id автора', nullable: false })
  @Column('int')
  userId: User['id'];

  @ApiProperty({ description: 'Текст поста', nullable: false })
  @Column('varchar')
  text: string;

  @ApiProperty({ description: 'Дата создания поста', nullable: false })
  @CreateDateColumn()
  dateOfCreate: string;
}
