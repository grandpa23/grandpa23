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
      url: "postgres://vvzvibry:g5nzASbDyBuaOlNknqWy5rzKVVzLGJvK@lallah.db.elephantsql.com/vvzvibry",
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
