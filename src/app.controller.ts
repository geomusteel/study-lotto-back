import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Get('test')
  async getHello() {
    await firstValueFrom(
      this.httpService.get(
        'https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=1',
      ),
    )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch lotto results', error);
      });

    return 'ok';
  }
}
