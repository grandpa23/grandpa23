import { plainToInstance } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { CreateCardDto } from './create-card.dto';
import { UpdateCardDto } from './update-card.dto';
import { DECORATORS } from '@nestjs/swagger/dist/constants';

describe('Cards DTO', () => {
  describe('Create Card DTO', () => {
    it('Поля помечены как @ApiProperty', async () => {
      const obj = new CreateCardDto();
      obj.name = 'test';
      obj.columnId = uuidv4();

      const dtoObject = plainToInstance(CreateCardDto, obj);

      const hasSwaggerMetadata = [
        Reflect.getMetadata(DECORATORS.API_MODEL_PROPERTIES, dtoObject, 'name'),
        Reflect.getMetadata(
          DECORATORS.API_MODEL_PROPERTIES,
          dtoObject,
          'columnId',
        ),
      ];

      expect(hasSwaggerMetadata.filter(Boolean).length).toBe(2);
    });
  });

  describe('Update Card DTO', () => {
    it('Поля помечены как @ApiProperty', async () => {
      const obj = new UpdateCardDto();
      obj.name = 'test';
      obj.columnId = uuidv4();

      const dtoObject = plainToInstance(CreateCardDto, obj);

      const hasSwaggerMetadata = [
        Reflect.getMetadata(DECORATORS.API_MODEL_PROPERTIES, dtoObject, 'name'),
        Reflect.getMetadata(
          DECORATORS.API_MODEL_PROPERTIES,
          dtoObject,
          'columnId',
        ),
      ];

      expect(hasSwaggerMetadata.filter(Boolean).length).toBe(2);
    });
  });
});
