import { Test, TestingModule } from '@nestjs/testing';
import { MakersResolver } from './makers.resolver';

describe('MakersResolver', () => {
  let resolver: MakersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MakersResolver],
    }).compile();

    resolver = module.get<MakersResolver>(MakersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
