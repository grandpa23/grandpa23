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
  import { NotesService } from './notes.service';
  import { CreateNoteDto } from './dto/create-note.dto';
  import { Note as NoteEntity } from './entities/note.entity';
  import { AuthGuard } from '@nestjs/passport';
  import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
  
  @ApiTags('Notes')
  @Controller('notes')
  export class NotesController {
    constructor(private notesService: NotesService) {}
  
    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiOperation({ summary: 'Создание нового поста' })
    @ApiResponse({ type: NoteEntity })
    @ApiBearerAuth()
    createOnePost(
      @Request() req: any,
      @Body() dto: CreateNoteDto,
    ): Promise<NoteEntity> {
      return this.notesService.createOneNote(req.user.id, dto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Получение всех постов' })
    @ApiResponse({ type: NoteEntity, isArray: true })
    getAllPosts(): Promise<NoteEntity[]> {
      return this.notesService.getAllNotes();
    }
  
    @ApiOperation({ summary: 'Получение одного поста' })
    @ApiParam({
      name: 'id',
      required: true,
      description: 'id необходимого поста',
    })
    @ApiResponse({ type: NoteEntity })
    @Get(':id')
    getOneNote(@Param('id') id: NoteEntity['id']): Promise<NoteEntity> {
      return this.notesService.getOneNote(id);
    }
  
    @ApiOperation({ summary: 'Удаление поста' })
    @ApiParam({ name: 'id', required: true, description: 'id удаляемого поста' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    deleteNote(
      @Request() req: any,
      @Param('id') id: NoteEntity['id'],
    ): Promise<boolean> {
      return this.notesService.deleteNote(req.user.id, id);
    }
  }
  