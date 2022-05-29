import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column } from './columns/entities/column.entity';
import { Card } from './cards/entities/card.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://lhvsknzj:Xsfvgb6qYEZlnmvyRs9o7bR-RxvSsHSk@tyke.db.elephantsql.com/lhvsknzj',
      synchronize: true,
      logging: 'all',
      entities: [Column, Card],
    }),
    ColumnsModule,
    CardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
