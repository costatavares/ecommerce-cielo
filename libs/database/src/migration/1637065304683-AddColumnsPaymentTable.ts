import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnsPaymentTable1637065304683 implements MigrationInterface {
    name = 'AddColumnsPaymentTable1637065304683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD "payment_id" character varying`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "created_at" date NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "payment_id"`);
    }

}
