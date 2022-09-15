import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMakers1665474383646 implements MigrationInterface {
  name = 'CreateMakers1665474383646';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`maker\` (\`id\` varchar(36) NOT NULL, \`slug\` varchar(255) NOT NULL COMMENT 'スラグ', \`name\` varchar(255) NOT NULL COMMENT '名前', \`createdAt\` datetime(6) NOT NULL COMMENT '作成日時' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '更新日時' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL COMMENT '削除日時', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`maker\``);
  }
}
