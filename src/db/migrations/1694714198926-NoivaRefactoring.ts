import { MigrationInterface, QueryRunner } from "typeorm"

export class PostRefactoring1694714198926 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "noiva" RENAME COLUMN "contact" TO "email"`,
        )
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "noiva" RENAME COLUMN "email" TO "contact"`,
        ) 
    }
}