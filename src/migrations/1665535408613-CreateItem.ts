import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateItem1665535408613 implements MigrationInterface {
  name = 'CreateItem1665535408613';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`item\` (\`id\` varchar(36) NOT NULL, \`slug\` varchar(255) NOT NULL COMMENT 'スラグ', \`name\` varchar(255) NOT NULL COMMENT '名前', \`description\` text NOT NULL COMMENT '説明', \`createdAt\` datetime(6) NOT NULL COMMENT '作成日時' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '更新日時' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL COMMENT '削除日時', UNIQUE INDEX \`IDX_0f77842c93ceb8c6624a58f538\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_0f77842c93ceb8c6624a58f538\` ON \`item\``,
    );
    await queryRunner.query(`DROP TABLE \`item\``);
  }
}
