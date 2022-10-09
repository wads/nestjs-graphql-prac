import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeBigintTypeToInt1666412989252 implements MigrationInterface {
  name = 'ChangeBigintTypeToInt1666412989252';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`admin_user\` CHANGE \`id\` \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_path\` DROP FOREIGN KEY \`FK_46a9011c5e4ba4e144cc2fc0fdf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_path\` DROP FOREIGN KEY \`FK_bc4105bba9da678149beabd66fb\``,
    );
    await queryRunner.query(`ALTER TABLE \`category\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`id\` int UNSIGNED NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(`ALTER TABLE \`category_path\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`category_path\` ADD PRIMARY KEY (\`descendantId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_path\` DROP COLUMN \`ancestorId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_path\` ADD \`ancestorId\` int UNSIGNED NOT NULL COMMENT '先祖ID'`,
    );
    await queryRunner.query(`ALTER TABLE \`category_path\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`category_path\` ADD PRIMARY KEY (\`descendantId\`, \`ancestorId\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`category_path\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`category_path\` ADD PRIMARY KEY (\`ancestorId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_path\` DROP COLUMN \`descendantId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_path\` ADD \`descendantId\` int UNSIGNED NOT NULL COMMENT '子孫ID'`,
    );
    await queryRunner.query(`ALTER TABLE \`category_path\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`category_path\` ADD PRIMARY KEY (\`ancestorId\`, \`descendantId\`)`,
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
    await queryRunner.query(`ALTER TABLE \`category_path\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`category_path\` ADD PRIMARY KEY (\`ancestorId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_path\` DROP COLUMN \`descendantId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_path\` ADD \`descendantId\` bigint UNSIGNED NOT NULL COMMENT '子孫ID'`,
    );
    await queryRunner.query(`ALTER TABLE \`category_path\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`category_path\` ADD PRIMARY KEY (\`descendantId\`, \`ancestorId\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`category_path\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`category_path\` ADD PRIMARY KEY (\`descendantId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_path\` DROP COLUMN \`ancestorId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_path\` ADD \`ancestorId\` bigint UNSIGNED NOT NULL COMMENT '先祖ID'`,
    );
    await queryRunner.query(`ALTER TABLE \`category_path\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`category_path\` ADD PRIMARY KEY (\`ancestorId\`, \`descendantId\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`id\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD PRIMARY KEY (\`id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_path\` ADD CONSTRAINT \`FK_bc4105bba9da678149beabd66fb\` FOREIGN KEY (\`descendantId\`) REFERENCES \`category\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_path\` ADD CONSTRAINT \`FK_46a9011c5e4ba4e144cc2fc0fdf\` FOREIGN KEY (\`ancestorId\`) REFERENCES \`category\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`admin_user\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`,
    );
  }
}
