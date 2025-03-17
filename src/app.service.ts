import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPing(): string {
    return 'Pong...';
  }

  getDocs(): string {
    return '⚙️ Welcome to CodeFlow Homepage! ⚙️';
  }
}
