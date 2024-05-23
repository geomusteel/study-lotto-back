import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GameResultModel } from './entity/game-result.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { GameResultModelDetailModel } from './entity/game-result-detail.entity';

@Injectable()
export class GameResultService {
  constructor(
    @InjectRepository(GameResultModel)
    private readonly gameResultRepository: Repository<GameResultModel>,
    @InjectRepository(GameResultModelDetailModel)
    private readonly gameResultDetailRepository: Repository<GameResultModelDetailModel>,
    private readonly httpService: HttpService,
  ) {}

  async insertLottoDraw() {
    for (let i = 1000; i <= 1118; i++) {
      const response = await firstValueFrom(
        this.httpService.get(
          `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${i}`,
        ),
      );

      const lottoData = this.gameResultRepository.create({
        drawNo: response.data.drwNo,
        totalSellingAmount: response.data.totSellamnt,
        drawNoDate: new Date(response.data.drwNoDate),
        firstWinningAmount: response.data.firstWinamnt,
        firstPrizeWinnerCount: response.data.firstPrzwnerCo,
        firstAccumulatedAmount: response.data.firstAccumamnt,
        ballNo1: response.data.drwtNo1,
        ballNo2: response.data.drwtNo2,
        ballNo3: response.data.drwtNo3,
        ballNo4: response.data.drwtNo4,
        ballNo5: response.data.drwtNo5,
        ballNo6: response.data.drwtNo6,
        bonusBallNo: response.data.bnusNo,
      });

      // const lottoData = plainToInstance(LottoModel, response.data);

      const errors = await validate(lottoData);

      if (errors.length > 0) {
        console.error('Validation failed:', errors);
        throw new Error('Validation failed');
      } else {
        await this.gameResultRepository.save(lottoData);
        console.log('Lotto draw data saved successfully.');
      }
    }
  }

  async lottoDrawArray() {
    // 로또 당첨 정보를 데이터베이스에서 가져옵니다.
    const lottoModels = await this.gameResultRepository.find();

    // 각 번호의 출현 횟수를 저장할 객체를 초기화합니다.
    const numberStatistic = {};

    lottoModels.forEach((lotto) => {
      [
        lotto.ballNo1,
        lotto.ballNo2,
        lotto.ballNo3,
        lotto.ballNo4,
        lotto.ballNo5,
        lotto.ballNo6,
      ].forEach((number) => {
        if (numberStatistic[number]) {
          numberStatistic[number]++;
        } else {
          numberStatistic[number] = 1;
        }
      });
    });
    return numberStatistic;
  }

  async lottoDrawRangeArray() {
    // 로또 당첨 정보를 데이터베이스에서 가져옵니다.
    const lottoModels = await this.gameResultRepository.find();

    // 각 번호의 출현 횟수를 저장할 객체를 초기화합니다.
    const numberStatistic = [0, 0, 0, 0, 0];

    lottoModels.forEach((lotto) => {
      [
        lotto.ballNo1,
        lotto.ballNo2,
        lotto.ballNo3,
        lotto.ballNo4,
        lotto.ballNo5,
        lotto.ballNo6,
      ].forEach((number) => {
        if (number <= 10) {
          numberStatistic[0]++;
        } else if (number <= 20) {
          numberStatistic[1]++;
        } else if (number <= 30) {
          numberStatistic[2]++;
        } else if (number <= 40) {
          numberStatistic[3]++;
        } else {
          numberStatistic[4]++;
        }
      });
    });
    return numberStatistic;
  }

  async findRound(roundNumber: number) {
    return await this.gameResultRepository.findOne({
      where: {
        drawNo: roundNumber,
      },
    });
  }

  async getLottoResults(drawNo: number): Promise<void> {
    const url = `https://dhlottery.co.kr/gameResult.do?method=byWin&drwNo=${drawNo}`;

    try {
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);
      const prizeInfo = [];

      // 각 등수별 당첨 정보 추출
      $('tbody > tr').each((i, elem) => {
        const rank = $(elem).find('td').first().text().replace(/\D/g, ''); // 등수
        const totalPrize = $(elem).find('td').eq(1).text().replace(/\D/g, ''); // 전체 상금
        const winners = $(elem).find('td').eq(2).text().replace(/\D/g, ''); // 당첨 인원
        const prizePerPerson = $(elem)
          .find('td')
          .eq(3)
          .text()
          .replace(/\D/g, ''); // 인당 당첨금

        prizeInfo.push({
          drawNumber: drawNo,
          rank,
          totalPrize,
          winners,
          prizePerPerson,
        });
      });

      for (const item of prizeInfo) {
        const lottoPrize = plainToInstance(GameResultModelDetailModel, item);
        await this.gameResultDetailRepository.save(lottoPrize);
      }
    } catch (error) {
      console.error('Error fetching prize info:', error);
      throw new Error('Unable to fetch prize info');
    }
  }
}
