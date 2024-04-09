import { Module } from '@nestjs/common';
import { LottoService } from './lotto.service';
import { LottoController } from './lotto.controller';

@Module({
  controllers: [LottoController],
  providers: [LottoService],
})
export class LottoModule {}
