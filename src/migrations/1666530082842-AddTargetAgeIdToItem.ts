import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTargetAgeIdToItem1666530082842 implements MigrationInterface {
  name = 'AddTargetAgeIdToItem1666530082842';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`item\` ADD \`targetAgeId\` int UNSIGNED NULL COMMENT '対象年齢ID'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` ADD CONSTRAINT \`FK_9ccb7cfc3be6ed80286bd2bf60d\` FOREIGN KEY (\`targetAgeId\`) REFERENCES \`target_age\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`item\` DROP FOREIGN KEY \`FK_9ccb7cfc3be6ed80286bd2bf60d\``,
    );
    await queryRunner.query(`ALTER TABLE \`item\` DROP COLUMN \`targetAgeId\``);
  }
}
