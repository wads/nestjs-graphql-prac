import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Maker } from './entities/maker.entity';
import { Repository } from 'typeorm';
import { OffsetLimitPaginationInput } from '../common/dto/offset-limit-pagination.input';
import { CreateMakerInput } from './dto/create-maker.input';
import { UpdateMakerInput } from './dto/update-maker.input';

@Injectable()
export class MakersService {
  constructor(
    @InjectRepository(Maker)
    private readonly makersRepository: Repository<Maker>,
  ) {}

  async create(input: CreateMakerInput) {
    const maker = this.makersRepository.create(input);
    return await this.makersRepository.save(maker);
  }

  async count() {
    return await this.makersRepository.count();
  }

  async findAll(input: OffsetLimitPaginationInput) {
    return await this.makersRepository.find({
      order: { id: 'DESC' },
      take: input.limit,
      skip: input.offset,
    });
  }

  async findOne(id: string) {
    const maker = await this.makersRepository.findOne({
      where: { id: id },
    });
    if (maker) {
      return maker;
    }
    throw new HttpException(
      'Maker with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  async update(id: string, input: UpdateMakerInput) {
    const maker = await this.findOne(id);
    this.makersRepository.merge(maker, input);
    return await this.makersRepository.save(maker);
  }

  async delete(id: string) {
    await this.makersRepository.softDelete(id);
    return;
  }
}
