import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryPath } from './entities/category-path.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, CategoryPath])],
  providers: [CategoriesResolver, CategoriesService],
})
export class CategoriesModule {}
