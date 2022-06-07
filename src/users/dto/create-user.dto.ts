import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Логин пользователя', nullable: false })
  @Length(1, 30)
  @IsString()
  username: string;

  @ApiProperty({ description: 'Mail пользователя', nullable: false })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Пароль пользователя', nullable: false })
  @IsNotEmpty()
  @IsString()
  password: string;
}
