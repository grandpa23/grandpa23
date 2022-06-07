import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { NotesModule } from 'src/notes/notes.module';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), NotesModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
