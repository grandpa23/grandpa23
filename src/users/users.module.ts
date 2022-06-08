import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PostsModule } from 'src/posts/posts.module';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PostsModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
