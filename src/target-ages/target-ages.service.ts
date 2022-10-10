import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTargetAgeInput } from './dto/create-target-age.input';
import { UpdateTargetAgeInput } from './dto/update-target-age.input';
import { TargetAge } from './entities/target-age.entity';
import { OffsetLimitPaginationInput } from '../common/dto/offset-limit-pagination.input';

@Injectable()
export class TargetAgesService {
  constructor(
    @InjectRepository(TargetAge)
    private readonly targetAgeRepository: Repository<TargetAge>,
  ) {}

  async create(input: CreateTargetAgeInput) {
    const targetAge = this.targetAgeRepository.create(input);
    await this.targetAgeRepository.save(targetAge);
    return this.findOne(targetAge.id);
  }

  async findAll(input: OffsetLimitPaginationInput) {
    return await this.targetAgeRepository.find({
      order: { id: 'ASC' },
      take: input.limit,
      skip: input.offset,
    });
  }

  async findOne(id: number) {
    const targetAge = await this.targetAgeRepository.findOne({
      where: { id: id },
    });
    if (targetAge) {
      return targetAge;
    }
    throw new HttpException(
      'TargetAge with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, input: UpdateTargetAgeInput) {
    const targetAge = await this.findOne(id);
    this.targetAgeRepository.merge(targetAge, input);
    return await this.targetAgeRepository.save(targetAge);
  }

  async remove(id: number) {
    await this.targetAgeRepository.delete(id);
    return;
  }

  async count() {
    return await this.targetAgeRepository.count();
  }
}
