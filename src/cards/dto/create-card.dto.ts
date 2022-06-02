import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateCardDto {
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsUUID()
  columnId: string;
}
