import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { EmailService } from './Services/email.service';
import { ExchangeService } from './Services/exchange.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [EmailService, ExchangeService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });
  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
