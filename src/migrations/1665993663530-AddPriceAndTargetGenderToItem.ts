import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPriceAndTargetGenderToItem1665993663530
  implements MigrationInterface
{
  name = 'AddPriceAndTargetGenderToItem1665993663530';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`item\` ADD \`price\` int UNSIGNED NULL COMMENT '価格'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` ADD \`targetGender\` tinyint UNSIGNED NOT NULL COMMENT '対象性別'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`item\` DROP COLUMN \`targetGender\``,
    );
    await queryRunner.query(`ALTER TABLE \`item\` DROP COLUMN \`price\``);
  }
}
