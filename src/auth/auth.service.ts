import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  SignInResponceDto,
  SignUpDto,
  SignUpResponceDto,
  SignInDto,
} from './dto/auth.dto';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto): Promise<SignUpResponceDto> {
    const isUserAlreadyExists = await this.usersRepository.count({
      where: { email: dto.email },
    });

    if (isUserAlreadyExists > 0) {
      throw new ForbiddenException('email already exists');
    }

    const codedPassword = await hash(dto.password, 5);
    const newUser = await this.usersRepository.save({
      email: dto.email,
      password: codedPassword,
    });

    const jwt = await this.jwtService.signAsync({
      sub: newUser.id,
    });

    return { user: newUser, jwtToken: jwt };
  }

  async signIn(dto: SignInDto): Promise<SignInResponceDto> {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException('Wrong mail or password');
    }

    const isPasswordCorrect = await compare(dto.password, user.password);

    if (!isPasswordCorrect) {
      throw new ForbiddenException('Wrong mail or password');
    }

    const jwt = await this.jwtService.signAsync({
      sub: user.id,
    });
    return { user: user, jwtToken: jwt };
  }
}
