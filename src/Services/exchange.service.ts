import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { BtcDto } from '../dto/btc.dto';

@Injectable()
export class ExchangeService {
  constructor(private readonly httpService: HttpService) {}

  async getExchangeRate(): Promise<BtcDto> {
    const observable = await this.httpService.get(
      'https://rest.coinapi.io/v1/exchangerate/BTC/UAH',
      {
        headers: {
          'X-CoinAPI-Key': 'C19A0522-1E12-40B5-99D9-3AEEA97071F0',
        },
      },
    );
    return firstValueFrom(observable).then((x) => x.data);
  }
}
