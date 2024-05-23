import { Module } from '@nestjs/common';
import { SaveNumberService } from './save-number.service';
import { SaveNumberController } from './save-number.controller';

@Module({
  controllers: [SaveNumberController],
  providers: [SaveNumberService],
})
export class SaveNumberModule {}
