import { Body, Controller, Get, Header, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { EmailService } from './Services/email.service';
import { ExchangeService } from './Services/exchange.service';
import { BtcDto } from './dto/btc.dto';

@Controller()
export class AppController {
  constructor(
    private readonly emailService: EmailService,
    private readonly exchangeService: ExchangeService,
  ) {}

  @Get('rate')
  async getRate(): Promise<BtcDto> {
    return this.exchangeService.getExchangeRate();
  }

  @Post('subscribe')
  @Header('content-type', 'application/json')
  async subscribe(@Body() emailDto: any, @Res() res: Response) {
    console.log(emailDto);
    if (await this.emailService.register(emailDto.email)) {
      res.statusMessage = 'E-mail added';
      res.status(200).send();
    } else {
      res.statusMessage = 'E-mail already in database';
      res.status(409).send();
    }
  }

  @Post('sendEmails')
  @Header('content-type', 'application/json')
  async send(@Res() res: Response): Promise<void> {
    res.statusMessage = 'E-mailʼи відправлено';
    res.status(200).send;
    const btcDto = await this.exchangeService.getExchangeRate();
    console.log(btcDto);
    this.emailService.sendEmails(btcDto);
  }
}
