import { Test, TestingModule } from '@nestjs/testing';
import { TargetAgesService } from './target-ages.service';

describe('TargetAgesService', () => {
  let service: TargetAgesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TargetAgesService],
    }).compile();

    service = module.get<TargetAgesService>(TargetAgesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
