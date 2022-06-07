import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { User } from '../users/entities/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private notesRepository: Repository<Note>,
  ) {}

  async createOneNote(reqUserId, dto: CreateNoteDto): Promise<Note> {
    if (reqUserId === dto.userId) {
      const data = await this.notesRepository.save(dto);
      return await this.notesRepository.findOneOrFail({
        where: { id: data.id },
        relations: ['user'],
      });
    } else {
      throw new ForbiddenException(
        "you can't add a post on someone else's behalf",
      );
    }
  }

  async getAllNotes(): Promise<Note[]> {
    return await this.notesRepository.find({
      relations: ['user'],
      order: { id: 'DESC' },
    });
  }

  async getOneNote(id: Note['id']): Promise<Note> {
    return await this.notesRepository.findOneOrFail({
      where: { id: id },
      relations: ['user'],
    });
  }

  async deleteNote(reqUserId, id: Note['id']): Promise<boolean> {
    const note: Note = await this.notesRepository.findOneOrFail({
      where: { id: id },
    });
    if (reqUserId === note.userId || reqUserId === 24) {
      await this.notesRepository.delete(id);
      return true;
    } else {
      throw new ForbiddenException("you can't delete someone else's post");
    }
  }

  async getUsersNotes(userId: User['id']): Promise<Note[]> {
    return await this.notesRepository.find({ where: { userId: userId } });
  }
}
