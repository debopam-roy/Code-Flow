import { Module } from '@nestjs/common';
import { SubmissionGateway } from './gateway/submission.gateway';

@Module({
  providers: [SubmissionGateway],
})
export class SubmissionModule {}
