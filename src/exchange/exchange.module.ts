import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { HttpModule } from '@nestjs/axios';
import { ExchangeController } from './exchange.controller';

@Module({
  providers: [ExchangeService],
  imports: [HttpModule],
  controllers: [ExchangeController],
  exports: [ExchangeService],
})
export class ExchangeModule {}
