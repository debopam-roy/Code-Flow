import { Module } from '@nestjs/common';
import { MembersGateway } from './gateway/members.gateway';

@Module({
  providers: [MembersGateway],
})
export class UsersModule {}
