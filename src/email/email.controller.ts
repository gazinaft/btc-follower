import { Body, Controller, Header, Post, Res } from '@nestjs/common';
import { EmailService } from './email.service';
import { Response } from 'express';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

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
    await this.emailService.sendEmails();
    res.statusMessage = 'E-mailʼи відправлено';
    res.status(200).send;
  }
}
