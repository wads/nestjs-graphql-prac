import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMakerIdToItems1665629365672 implements MigrationInterface {
  name = 'AddMakerIdToItems1665629365672';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`item\` ADD \`makerId\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`item\` ADD CONSTRAINT \`FK_7095bb5b884110658a054a9e14e\` FOREIGN KEY (\`makerId\`) REFERENCES \`maker\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`item\` DROP FOREIGN KEY \`FK_7095bb5b884110658a054a9e14e\``,
    );
    await queryRunner.query(`ALTER TABLE \`item\` DROP COLUMN \`makerId\``);
  }
}
