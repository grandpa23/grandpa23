import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsString, IsUUID } from 'class-validator';

export class CreateCardDto {
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsUUID()
  columnId: string;
}
