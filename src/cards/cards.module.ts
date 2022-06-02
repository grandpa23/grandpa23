import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { Card } from './entities/card.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsRepository } from './cards.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Card, CardsRepository])],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
