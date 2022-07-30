import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EmailService } from './Services/email.service';
import { ExchangeService } from './Services/exchange.service';
import { HttpModule } from '@nestjs/axios';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    HttpModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ukr.net',
        secure: true,
        port: 465,
        auth: {
          user: 'test-btc-genesis@ukr.net',
          pass: 'nRCFFQNFvQgu8sLZ',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [EmailService, ExchangeService],
})
export class AppModule {}
