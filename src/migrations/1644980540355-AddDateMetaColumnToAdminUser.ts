import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDateMetaColumnToAdminUser1644980540355 implements MigrationInterface {
    name = 'AddDateMetaColumnToAdminUser1644980540355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`admin_user\` ADD \`createdAt\` datetime(6) NOT NULL COMMENT '作成日時' DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`admin_user\` ADD \`updatedAt\` datetime(6) NOT NULL COMMENT '更新日時' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`admin_user\` ADD \`deletedAt\` datetime(6) NULL COMMENT '削除日時'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`admin_user\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`admin_user\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`admin_user\` DROP COLUMN \`createdAt\``);
    }

}
