import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategoryPath1666368078561 implements MigrationInterface {
  name = 'CreateCategoryPath1666368078561';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`category_path\` (\`ancestorId\` bigint UNSIGNED NOT NULL COMMENT '先祖ID', \`descendantId\` bigint UNSIGNED NOT NULL COMMENT '子孫ID', \`length\` int UNSIGNED NOT NULL COMMENT '階層の深さ' DEFAULT '0', \`createdAt\` datetime(6) NOT NULL COMMENT '作成日時' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '更新日時' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL COMMENT '削除日時', PRIMARY KEY (\`ancestorId\`, \`descendantId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` DROP FOREIGN KEY \`FK_7095bb5b884110658a054a9e14e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`makerId\` \`makerId\` varchar(36) NOT NULL COMMENT 'メーカーID'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_path\` ADD CONSTRAINT \`FK_46a9011c5e4ba4e144cc2fc0fdf\` FOREIGN KEY (\`ancestorId\`) REFERENCES \`category\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_path\` ADD CONSTRAINT \`FK_bc4105bba9da678149beabd66fb\` FOREIGN KEY (\`descendantId\`) REFERENCES \`category\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` ADD CONSTRAINT \`FK_7095bb5b884110658a054a9e14e\` FOREIGN KEY (\`makerId\`) REFERENCES \`maker\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`item\` DROP FOREIGN KEY \`FK_7095bb5b884110658a054a9e14e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_path\` DROP FOREIGN KEY \`FK_bc4105bba9da678149beabd66fb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_path\` DROP FOREIGN KEY \`FK_46a9011c5e4ba4e144cc2fc0fdf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`makerId\` \`makerId\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` ADD CONSTRAINT \`FK_7095bb5b884110658a054a9e14e\` FOREIGN KEY (\`makerId\`) REFERENCES \`maker\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(`DROP TABLE \`category_path\``);
  }
}
