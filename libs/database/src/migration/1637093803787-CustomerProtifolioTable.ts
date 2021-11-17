import {MigrationInterface, QueryRunner} from "typeorm";

export class CustomerProtifolioTable1637093803787 implements MigrationInterface {
    name = 'CustomerProtifolioTable1637093803787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer-portfolio" DROP COLUMN "value_last_purchase"`);
        await queryRunner.query(`ALTER TABLE "customer-portfolio" ADD "value_last_purchase" numeric(5,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer-portfolio" DROP COLUMN "value_last_purchase"`);
        await queryRunner.query(`ALTER TABLE "customer-portfolio" ADD "value_last_purchase" character varying NOT NULL`);
    }

}
