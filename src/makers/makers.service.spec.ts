import { Test, TestingModule } from '@nestjs/testing';
import { MakersService } from './makers.service';

describe('MakersService', () => {
  let service: MakersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MakersService],
    }).compile();

    service = module.get<MakersService>(MakersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
