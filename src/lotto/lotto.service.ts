import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LottoModel } from './entity/lotto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class LottoService {
  constructor(
    @InjectRepository(LottoModel)
    private readonly lottoRepository: Repository<LottoModel>,
    private readonly httpService: HttpService,
  ) {}

  async insertLottoDraw() {
    for (let i = 1; i < 1115; i++) {
      const response = await firstValueFrom(
        this.httpService.get(
          `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${i}`,
        ),
      );

      const lottoData = plainToInstance(LottoModel, response.data);

      const errors = await validate(lottoData);

      if (errors.length > 0) {
        console.error('Validation failed:', errors);
        throw new Error('Validation failed');
      } else {
        await this.lottoRepository.save(lottoData);
        console.log('Lotto draw data saved successfully.');
      }
    }
  }

  async lottoDrawArray() {
    // 로또 당첨 정보를 데이터베이스에서 가져옵니다.
    const lottoModels = await this.lottoRepository.find();
    console.log(lottoModels);

    // 각 번호의 출현 횟수를 저장할 객체를 초기화합니다.
    const numberStatistic = {};

    lottoModels.forEach((lotto) => {
      [
        lotto.drwtNo1,
        lotto.drwtNo2,
        lotto.drwtNo3,
        lotto.drwtNo4,
        lotto.drwtNo5,
        lotto.drwtNo6,
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
}
