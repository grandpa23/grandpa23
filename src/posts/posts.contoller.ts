import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Создание нового поста' })
  @ApiResponse({ type: PostEntity })
  @ApiBearerAuth()
  createOnePost(
    @Request() req: any,
    @Body() dto: CreatePostDto,
  ): Promise<PostEntity> {
    return this.postsService.createOnePost(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех постов' })
  @ApiResponse({ type: PostEntity, isArray: true })
  getAllPosts(): Promise<PostEntity[]> {
    return this.postsService.getAllPosts();
  }

  @ApiOperation({ summary: 'Получение одного поста' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id необходимого поста',
  })
  @ApiResponse({ type: PostEntity })
  @Get(':id')
  getOnePost(@Param('id') id: PostEntity['id']): Promise<PostEntity> {
    return this.postsService.getOnePost(id);
  }

  //   @Patch(':id')
  //   updateOnePost(
  //     @Param('id') id: PostEntity['id'],
  //     @Body() dto: UpdatePostDto,
  //   ): Promise<PostEntity> {
  //     return this.postsService.updateOnePost(id, dto);
  //   }

  @ApiOperation({ summary: 'Удаление поста' })
  @ApiParam({ name: 'id', required: true, description: 'id удаляемого поста' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deletePost(
    @Request() req: any,
    @Param('id') id: PostEntity['id'],
  ): Promise<boolean> {
    return this.postsService.deletePost(req.user.id, id);
  }
}
