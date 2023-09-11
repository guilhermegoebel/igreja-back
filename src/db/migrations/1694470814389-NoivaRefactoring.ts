import { MigrationInterface, QueryRunner } from "typeorm"

export class NoivaRefactoring1694470814389 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "noiva" RENAME COLUMN "contact" TO "email"`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "noiva" RENAME COLUMN "email" TO "contact"`,
        ) 
    }

}
