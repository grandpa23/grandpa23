import { Controller, Post, Body } from '@nestjs/common';
import {
  SignUpDto,
  SignInDto,
  SignInResponceDto,
  SignUpResponceDto,
} from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({ type: SignUpResponceDto })
  @Post('signUp')
  signUp(@Body() signUp: SignUpDto): Promise<SignUpResponceDto> {
    return this.authService.signUp(signUp);
  }

  @ApiResponse({ type: SignInResponceDto })
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @Post('signIn')
  signIn(@Body() signIn: SignInDto): Promise<SignInResponceDto> {
    return this.authService.signIn(signIn);
  }
}
