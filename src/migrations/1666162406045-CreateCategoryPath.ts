import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategoryPath1666162406045 implements MigrationInterface {
  name = 'CreateCategoryPath1666162406045';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`category_path\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`ancestorId\` bigint UNSIGNED NOT NULL COMMENT '先祖ID', \`descendantId\` bigint UNSIGNED NOT NULL COMMENT '子孫ID', \`depth\` int UNSIGNED NOT NULL COMMENT '階層の深さ' DEFAULT '0', \`createdAt\` datetime(6) NOT NULL COMMENT '作成日時' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '更新日時' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL COMMENT '削除日時', UNIQUE INDEX \`IDX_e7856c24be3d8dc9b978f38d80\` (\`ancestorId\`, \`descendantId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_path\` ADD CONSTRAINT \`FK_46a9011c5e4ba4e144cc2fc0fdf\` FOREIGN KEY (\`ancestorId\`) REFERENCES \`category\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_path\` ADD CONSTRAINT \`FK_bc4105bba9da678149beabd66fb\` FOREIGN KEY (\`descendantId\`) REFERENCES \`category\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`category_path\` DROP FOREIGN KEY \`FK_bc4105bba9da678149beabd66fb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_path\` DROP FOREIGN KEY \`FK_46a9011c5e4ba4e144cc2fc0fdf\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e7856c24be3d8dc9b978f38d80\` ON \`category_path\``,
    );
    await queryRunner.query(`DROP TABLE \`category_path\``);
  }
}
