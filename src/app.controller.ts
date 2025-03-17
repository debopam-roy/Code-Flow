import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getDocs(): string {
    return this.appService.getDocs();
  }

  @Get('ping')
  getPing(): string {
    return this.appService.getPing();
  }
}
