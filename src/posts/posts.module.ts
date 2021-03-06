import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostsController } from './posts.contoller';

@Module({
  exports: [PostsService],
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
