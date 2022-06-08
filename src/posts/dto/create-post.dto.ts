import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class CreatePostDto {
  @ApiProperty({ description: 'Текст поста', nullable: false })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({ description: 'Id автора поста', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  userId: User['id'];
}
