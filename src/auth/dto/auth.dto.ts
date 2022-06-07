import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class SignUpDto {
  @ApiProperty({ description: 'Логин пользователя', nullable: false })
  @IsString()
  @Length(1, 30)
  username: string;

  @ApiProperty({ description: 'Mail пользователя', nullable: false })
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Пароль пользователя', nullable: false })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignUpResponceDto {
  @ApiProperty({ description: 'Пользователь', nullable: false })
  user: User;

  @ApiProperty({ description: 'JWT-token', nullable: false })
  jwtToken: string;
}

export class SignInDto {
  @ApiProperty({ description: 'Mail пользователя', nullable: false })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Пароль пользователя', nullable: false })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignInResponceDto {
  @ApiProperty({ description: 'Пользователь', nullable: false })
  user: User;

  @ApiProperty({ description: 'JWT-token', nullable: false })
  jwtToken: string;
}
