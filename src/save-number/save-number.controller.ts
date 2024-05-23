import { Controller } from '@nestjs/common';
import { SaveNumberService } from './save-number.service';

@Controller('save-number')
export class SaveNumberController {
  constructor(private readonly saveNumberService: SaveNumberService) {}
}
