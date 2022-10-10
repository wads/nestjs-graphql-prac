import { Test, TestingModule } from '@nestjs/testing';
import { TargetAgesResolver } from './target-ages.resolver';
import { TargetAgesService } from './target-ages.service';

describe('TargetAgesResolver', () => {
  let resolver: TargetAgesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TargetAgesResolver, TargetAgesService],
    }).compile();

    resolver = module.get<TargetAgesResolver>(TargetAgesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
