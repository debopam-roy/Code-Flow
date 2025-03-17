import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionGateway } from './submission.gateway';

describe('SubmissionGateway', () => {
  let gateway: SubmissionGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmissionGateway],
    }).compile();

    gateway = module.get<SubmissionGateway>(SubmissionGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
