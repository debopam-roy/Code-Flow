import { Module } from '@nestjs/common';
import { RoomController } from './controller/room.controller';
import { RoomService } from './service/room.service';
import { RedisService } from 'src/util/redis.service';
import { AuthModule } from 'src/auth/auth.module';
import { MailerService } from 'src/util/mailer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatModule } from './components/chat/chat.module';
import { EditorModule } from './components/editor/editor.module';
import { SubmissionModule } from './components/submission/submission.module';
import { UsersModule } from './components/members/members.module';

@Module({
  imports: [
    AuthModule,
    ChatModule,
    EditorModule,
    SubmissionModule,
    UsersModule,
  ],
  providers: [
    RedisService,
    RoomService,
    MailerService,
    PrismaService,
    UsersModule,
    EditorModule,
    ChatModule,
    SubmissionModule,
  ],
  controllers: [RoomController],
})
export class RoomModule {}
