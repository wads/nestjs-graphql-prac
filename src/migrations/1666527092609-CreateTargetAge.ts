import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTargetAge1666527092609 implements MigrationInterface {
  name = 'CreateTargetAge1666527092609';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`target_age\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`slug\` varchar(255) NOT NULL COMMENT 'スラグ', \`name\` varchar(255) NOT NULL COMMENT '名前', \`createdAt\` datetime(6) NOT NULL COMMENT '作成日時' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '更新日時' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_56bb092069281421c725d15405\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_56bb092069281421c725d15405\` ON \`target_age\``,
    );
    await queryRunner.query(`DROP TABLE \`target_age\``);
  }
}
