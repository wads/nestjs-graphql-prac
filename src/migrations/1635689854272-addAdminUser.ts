import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAdminUser1635689854272 implements MigrationInterface {
  name = 'addAdminUser1635689854272';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`admin_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL COMMENT 'メールアドレス', \`userName\` varchar(255) NOT NULL COMMENT 'ユーザー名', \`password\` varchar(255) NOT NULL COMMENT 'パスワード', \`isActive\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_840ac5cd67be99efa5cd989bf9\` (\`email\`), UNIQUE INDEX \`IDX_875801b7f5a40a55ec996cc269\` (\`userName\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_875801b7f5a40a55ec996cc269\` ON \`admin_user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_840ac5cd67be99efa5cd989bf9\` ON \`admin_user\``,
    );
    await queryRunner.query(`DROP TABLE \`admin_user\``);
  }
}
