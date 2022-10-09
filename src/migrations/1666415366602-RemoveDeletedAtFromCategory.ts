import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDeletedAtFromCategory1666415366602
  implements MigrationInterface
{
  name = 'RemoveDeletedAtFromCategory1666415366602';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`category\` DROP COLUMN \`deletedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_path\` DROP COLUMN \`deletedAt\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`category_path\` ADD \`deletedAt\` datetime(6) NULL COMMENT '削除日時'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`deletedAt\` datetime(6) NULL COMMENT '削除日時'`,
    );
  }
}
