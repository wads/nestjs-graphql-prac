import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddComment1666162957555 implements MigrationInterface {
  name = 'AddComment1666162957555';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`item\` DROP FOREIGN KEY \`FK_7095bb5b884110658a054a9e14e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` CHANGE \`makerId\` \`makerId\` varchar(36) NOT NULL COMMENT 'メーカーID'`,
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
      `ALTER TABLE \`item\` CHANGE \`makerId\` \`makerId\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` ADD CONSTRAINT \`FK_7095bb5b884110658a054a9e14e\` FOREIGN KEY (\`makerId\`) REFERENCES \`maker\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
  }
}
