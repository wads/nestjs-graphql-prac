import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { Item } from './entities/item.entity';
import { OffsetLimitPaginationInput } from '../common/dto/offset-limit-pagination.input';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  async create(input: CreateItemInput) {
    const item = this.itemsRepository.create(input);
    return await this.itemsRepository.save(item);
  }

  async findAll(input: OffsetLimitPaginationInput) {
    return await this.itemsRepository.find({
      relations: { maker: true },
      order: { createdAt: 'DESC' },
      take: input.limit,
      skip: input.offset,
    });
  }

  async findOne(id: string) {
    const item = await this.itemsRepository.findOne({
      where: { id: id },
      relations: { maker: true },
    });
    if (item) {
      return item;
    }
    throw new HttpException(
      'Item with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: string, input: UpdateItemInput) {
    const item = await this.findOne(id);
    this.itemsRepository.merge(item, input);
    return await this.itemsRepository.save(item);
  }

  async remove(id: string) {
    await this.itemsRepository.softDelete(id);
    return;
  }

  async count() {
    return await this.itemsRepository.count();
  }

  // TODO: queryの書き方
  //       findAll()とのオーバーロードにしたい
  async findAllByMakerId(makerId: string) {
    return this.itemsRepository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.maker', 'maker')
      .where('item.makerId = :id', { id: makerId })
      .orderBy('item.createdAt', 'DESC')
      .getMany();
  }
}
