import { Note } from '../../notes/entities/note.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ description: 'Id пользователя', nullable: false })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: 'Логин пользователя', nullable: false })
  @Column('varchar')
  username: string;

  @ApiProperty({ description: 'Mail пользователя', nullable: false })
  @Column('varchar')
  email: string;

  @ApiProperty({ description: 'Пароль пользователя', nullable: false })
  @Column('varchar')
  password: string;

  @OneToMany(() => Note, (note) => note.user)
  notes?: Note[];

  @ApiProperty({ description: 'Дата регистрации', nullable: false })
  @CreateDateColumn()
  dateOfCreate: string;
}
