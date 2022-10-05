import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategory1666160740049 implements MigrationInterface {
  name = 'CreateCategory1666160740049';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`category\` (\`id\` bigint UNSIGNED NOT NULL, \`slug\` varchar(255) NOT NULL COMMENT 'スラグ', \`name\` varchar(255) NOT NULL COMMENT '名前', \`createdAt\` datetime(6) NOT NULL COMMENT '作成日時' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '更新日時' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL COMMENT '削除日時', UNIQUE INDEX \`IDX_cb73208f151aa71cdd78f662d7\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_cb73208f151aa71cdd78f662d7\` ON \`category\``,
    );
    await queryRunner.query(`DROP TABLE \`category\``);
  }
}
