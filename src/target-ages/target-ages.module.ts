import { Module } from '@nestjs/common';
import { TargetAgesService } from './target-ages.service';
import { TargetAgesResolver } from './target-ages.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TargetAge } from './entities/target-age.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TargetAge])],
  providers: [TargetAgesResolver, TargetAgesService],
})
export class TargetAgesModule {}
