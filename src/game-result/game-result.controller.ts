import { Controller, Get, Param, Query } from '@nestjs/common';
import { GameResultService } from './game-result.service';

@Controller('game-result')
export class GameResultController {
  constructor(private readonly lottoService: GameResultService) {}

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

  @Get('prizes/:drawNo')
  getPrizeInfo(@Param('drawNo') drawNo: number) {
    return this.lottoService.getLottoResults(drawNo);
  }
}
