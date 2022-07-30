import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { MailerService } from '@nestjs-modules/mailer';
import { ExchangeService } from '../exchange/exchange.service';

@Injectable()
export class EmailService {
  filename: string;

  constructor(
    private readonly mailerService: MailerService,
    private readonly exchangeService: ExchangeService,
  ) {
    this.filename = 'emails.json';
  }

  async register(email: string): Promise<boolean> {
    const arr = await fs
      .readFile(this.filename)
      .then((x) => JSON.parse(x.toString()));
    console.log(email);
    if (arr.emails.includes(email) || !this.validate(email)) {
      return false;
    }
    arr.emails.push(email);
    fs.writeFile(this.filename, JSON.stringify(arr));
    console.log(arr);
    return true;
  }

  validate(email: string): boolean {
    const regex = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
    );
    return regex.test(email);
  }

  async getEmails(): Promise<string[]> {
    return fs
      .readFile(this.filename)
      .then((x) => JSON.parse(x.toString()))
      .then((x) => x.emails);
  }

  async sendEmails(): Promise<void> {
    const emails = await this.getEmails();
    const rate = await this.exchangeService.getExchangeRate();
    for (const email of emails) {
      console.log(email);
      this.mailerService.sendMail({
        from: 'Noreply <test-btc-genesis@ukr.net>',
        to: email,
        subject: 'Current BTC to UAH exchange rate',
        text: `Good day! Current BTC to UAH exchange rate is ${rate.rate}`,
        html: `<p>Good day!</p><p>Current BTC to UAH exchange rate is <b>${rate.rate}</b></p>`,
      });
    }
  }
}
