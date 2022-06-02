import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ColumnsService } from './columns.service';
import { Column } from './entities/column.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto'
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: Column,
  },
  dto: {
    create: CreateColumnDto,
    update: UpdateColumnDto,
  }
})
@ApiTags('columns')
@Controller('columns')
export class ColumnsController implements CrudController<Column> {
  constructor(public service: ColumnsService) {}
}
