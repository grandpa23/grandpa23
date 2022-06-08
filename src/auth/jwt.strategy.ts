import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KEY } from '../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jwtSecretKey',
      ignoreExpiration: false,
    } as StrategyOptions);
  }

  async validate(payload: { sub: string }): Promise<User> {
    const userId = payload.sub;

    const user = await this.usersRepository.findOne({where: {id: parseInt(userId, 10)}});
    if (!user) {
      throw new ForbiddenException();
    }

    return user;
  }
}
