import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maker } from './entities/maker.entity';
import { MakersService } from './makers.service';
import { MakersResolver } from './makers.resolver';
import { ItemsModule } from '../items/items.module';

@Module({
  imports: [TypeOrmModule.forFeature([Maker]), ItemsModule],
  providers: [MakersService, MakersResolver],
})
export class MakersModule {}
