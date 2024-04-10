import { Module } from '@nestjs/common';
import { LottoService } from './lotto.service';
import { LottoController } from './lotto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LottoModel } from './entity/lotto.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([LottoModel]), HttpModule],
  controllers: [LottoController],
  providers: [LottoService],
})
export class LottoModule {}
