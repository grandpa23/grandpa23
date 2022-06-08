import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Post as PostEntity } from '../posts/entities/post.entity';
import { PostsService } from '../posts/posts.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private postsService: PostsService,
  ) {}

  // @ApiOperation({ summary: 'Создание нового пользователя' })
  // @ApiResponse({ type: User })
  // @Post()
  // createOneUser(@Body() dto: CreateUserDto): Promise<User> {
  //   return this.userService.createOneUser(dto);
  // }

  @ApiOperation({ summary: 'Получение списка всех пользователей' })
  @ApiResponse({ type: User, isArray: true })
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получение одного пользователя' })
  @ApiResponse({ type: User })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id необходимого пользователя',
  })
  @Get(':id')
  getOneUser(@Param('id') id: User['id']): Promise<User> {
    return this.userService.getOneUser(id);
  }

  //   @Patch(':id')
  //   updateOneUser(
  //     @Param('id') id: User['id'],
  //     @Body() dto: UpdateUserDto,
  //   ): Promise<User> {
  //     return this.userService.updateOneUser(id, dto);
  //   }

  // @UseGuards(AuthGuard('jwt'))
  // @Delete(':id')
  // deleteUser(@Param('id') id: User['id']) {
  //   this.userService.deleteUser(id);
  // }

  @ApiOperation({ summary: 'Получение всех постов пользователя' })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'id пользователя поста',
  })
  @ApiResponse({ type: PostEntity, isArray: true })
  @Get(':userId/posts')
  getUsersPosts(@Param('userId') userId: User['id']): Promise<PostEntity[]> {
    return this.postsService.getUsersPosts(userId);
  }
}
