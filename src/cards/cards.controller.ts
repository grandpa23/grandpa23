import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CardsService } from './cards.service';
import { Card } from './entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto'
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: Card,
  },
  dto: {
    create: CreateCardDto,
    update: UpdateCardDto,
  }
})
@ApiTags('cards')
@Controller('cards')
export class CardsController implements CrudController<Card> {
  constructor(public service: CardsService) {}
}
