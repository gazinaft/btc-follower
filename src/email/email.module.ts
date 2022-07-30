import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ExchangeModule } from '../exchange/exchange.module';

@Module({
  providers: [EmailService],
  controllers: [EmailController],
  imports: [
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
    ExchangeModule,
  ],
  exports: [ExchangeModule],
})
export class EmailModule {}
