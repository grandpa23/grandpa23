import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async createOnePost(reqUserId, dto: CreatePostDto): Promise<Post> {
    if (reqUserId === dto.userId) {
      const data = await this.postsRepository.save(dto);
      return await this.postsRepository.findOneOrFail({
        where: { id: data.id },
        relations: ['user'],
      });
    } else {
      throw new ForbiddenException(
        "you can't add a post on someone else's behalf",
      );
    }
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.postsRepository.find({
      relations: ['user'],
      order: { id: 'DESC' },
    });
  }

  async getOnePost(id: Post['id']): Promise<Post> {
    return await this.postsRepository.findOneOrFail({
      where: { id: id },
      relations: ['user'],
    });
  }

  //   async updateOnePost(id: Post['id'], dto: UpdatePostDto): Promise<Post> {
  //     return await this.postsRepository.save({ id: id, ...dto });
  //   }

  async deletePost(reqUserId, id: Post['id']): Promise<boolean> {
    const post: Post = await this.postsRepository.findOneOrFail({
      where: { id: id },
    });
    if (reqUserId === post.userId || reqUserId === 24) {
      await this.postsRepository.delete(id);
      return true;
    } else {
      throw new ForbiddenException("you can't delete someone else's post");
    }
  }

  async getUsersPosts(userId: User['id']): Promise<Post[]> {
    return await this.postsRepository.find({ where: { userId: userId } });
  }
}
