import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterColumnTableCard1636565786602 implements MigrationInterface {
    name = 'AlterColumnTableCard1636565786602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "card_number"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "card_number" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "card_number"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "card_number" integer NOT NULL`);
    }

}
