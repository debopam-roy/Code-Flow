import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { RoomModule } from './room/room.module';

@Module({
  imports: [AuthModule, RoomModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
