import { Controller, Get } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { BtcDto } from '../core/btc.dto';

@Controller('rate')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get()
  async getRate(): Promise<BtcDto> {
    return this.exchangeService.getExchangeRate();
  }
}
