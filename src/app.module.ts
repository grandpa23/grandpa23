import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Column } from './columns/entities/column.entity';
import { Card } from './cards/entities/card.entity';

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: "postgres://anqvznmv:eHe12msiNaTVNj0yzgaeCkKDCSBrNUKh@raja.db.elephantsql.com/anqvznmv",
      synchronize: true,
      logging: 'all',
      entities: [Column, Card],
    } as TypeOrmModuleOptions),

    ColumnsModule,
    CardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
