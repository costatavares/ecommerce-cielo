import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumStatusPayment1636726559527 implements MigrationInterface {
    name = 'AddColumStatusPayment1636726559527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD "status" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "status"`);
    }

}
