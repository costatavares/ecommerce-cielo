import {MigrationInterface, QueryRunner} from "typeorm";

export class TransactionOneToOne1637155879783 implements MigrationInterface {
    name = 'TransactionOneToOne1637155879783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" RENAME COLUMN "added_amount" TO "payment_id"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "payment_id"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "payment_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "UQ_87d332611ebc2beababe8dc4d18" UNIQUE ("payment_id")`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_87d332611ebc2beababe8dc4d18" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_87d332611ebc2beababe8dc4d18"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "UQ_87d332611ebc2beababe8dc4d18"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "payment_id"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "payment_id" numeric(5,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "transaction" RENAME COLUMN "payment_id" TO "added_amount"`);
    }

}
