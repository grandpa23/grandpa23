import { Controller, Get, Param} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Note as NoteEntity } from '../notes/entities/note.entity';
import { NotesService } from '../notes/notes.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private notesService: NotesService,
  ) {}

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

  @ApiOperation({ summary: 'Получение всех постов пользователя' })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'id пользователя поста',
  })
  @ApiResponse({ type: NoteEntity, isArray: true })
  @Get(':userId/notes')
  getUsersNotes(@Param('userId') userId: User['id']): Promise<NoteEntity[]> {
    return this.notesService.getUsersNotes(userId);
  }
}
