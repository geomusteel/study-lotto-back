import { Controller, Get, Query } from '@nestjs/common';
import { LottoService } from './lotto.service';

@Controller('lotto')
export class LottoController {
  constructor(private readonly lottoService: LottoService) {}

  @Get('save-draw')
  async getLottoDrawSave() {
    await this.lottoService.insertLottoDraw();
  }

  @Get('draws')
  async getLottoDraws() {
    return await this.lottoService.lottoDrawArray();
  }

  @Get('draws-range')
  async getLottoDrawsRange() {
    return await this.lottoService.lottoDrawRangeArray();
  }

  @Get('round')
  async getLottoRound(@Query('roundNumber') roundNumber: number) {
    return await this.lottoService.findRound(roundNumber);
  }
}
