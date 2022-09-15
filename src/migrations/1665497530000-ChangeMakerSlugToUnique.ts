import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeMakerSlugToUnique1665497530000 implements MigrationInterface {
  name = 'ChangeMakerSlugToUnique1665497530000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`maker\` ADD UNIQUE INDEX \`IDX_e9bacaf01214121b5dfe761a70\` (\`slug\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`maker\` DROP INDEX \`IDX_e9bacaf01214121b5dfe761a70\``,
    );
  }
}
