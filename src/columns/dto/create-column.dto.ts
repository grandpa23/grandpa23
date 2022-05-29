import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsString } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty()
  @IsString()
  name: string;
}
