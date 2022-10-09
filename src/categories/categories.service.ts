import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';
import { OffsetLimitPaginationInput } from '../common/dto/offset-limit-pagination.input';
import { CategoryPath } from './entities/category-path.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(CategoryPath)
    private readonly categoryPathsRepository: Repository<CategoryPath>,
  ) {}

  async create(input: CreateCategoryInput) {
    // CreateCategoryInput.parentCategoryIdがCategoryのidに存在しない場合は
    // トップレベルのカテゴリ（親カテゴリーなし）として登録されます
    const category = this.categoriesRepository.create(input);
    await this.categoriesRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.getRepository(Category).save(category);
        const parentId =
          input.parentCategoryId == null ? category.id : input.parentCategoryId;
        // 処理の詳細はClosure Tableを参照
        // https://www.slideshare.net/billkarwin/models-for-hierarchical-data
        await transactionalEntityManager.query(
          `
            INSERT INTO category_path(ancestorId, descendantId, length)
            SELECT ancestorId, ?, length + 1 FROM category_path
            WHERE descendantId = ?
            UNION ALL SELECT ?, ?, 0
          `,
          [category.id, parentId, category.id, category.id],
        );
      },
    );

    return this.findOne(category.id);
  }

  async findAll(input: OffsetLimitPaginationInput) {
    return await this.categoriesRepository.find({
      order: { id: 'ASC' },
      take: input.limit,
      skip: input.offset,
    });
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id: id },
    });
    if (category) {
      return category;
    }
    throw new HttpException(
      'Category with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, input: UpdateCategoryInput) {
    const category = await this.findOne(id);
    this.categoriesRepository.merge(category, input);
    return await this.categoriesRepository.save(category);
  }

  async remove(id: number) {
    // 末端のパスの場合のみ削除可能
    if (!(await this.isEndOfPath(id))) {
      return false;
    }

    await this.categoriesRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.getRepository(CategoryPath).delete({
          descendantId: id,
        });
        await transactionalEntityManager.getRepository(Category).delete(id);
      },
    );
    return true;
  }

  async count() {
    return await this.categoriesRepository.count();
  }

  private async isEndOfPath(categoryId: number) {
    const pathCounts = await this.categoryPathsRepository.count({
      where: { ancestorId: categoryId },
    });
    return pathCounts == 1;
  }
}
