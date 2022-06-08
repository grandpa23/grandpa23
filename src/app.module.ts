import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Post } from './posts/entities/post.entity';
import { User } from './users/entities/user.entity';
import { DB_URL } from './config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: "postgres://anqvznmv:eHe12msiNaTVNj0yzgaeCkKDCSBrNUKh@raja.db.elephantsql.com/anqvznmv",
      entities: [User, Post],
      synchronize: false,
    }),
    UsersModule,
    PostsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
