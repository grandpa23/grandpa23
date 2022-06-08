import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
// import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  // async createOneUser(dto: CreateUserDto): Promise<User> {
  //   return await this.usersRepository.save(dto);
  // }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getOneUser(id: User['id']): Promise<User> {
    return await this.usersRepository.findOneOrFail({where: {id: id}});
  }

  //   async updateOnePost(id: Post['id'], dto: UpdatePostDto): Promise<Post> {
  //     return await this.postsRepository.save({ id: id, ...dto });
  //   }

  // async deleteUser(id: User['id']) {
  //   await this.usersRepository.delete(id);
  // }
}
