import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterColumnCustomerPortfolio1637088566328 implements MigrationInterface {
    name = 'AlterColumnCustomerPortfolio1637088566328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer-portfolio" ALTER COLUMN "purchase_date" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer-portfolio" ALTER COLUMN "purchase_date" DROP DEFAULT`);
    }

}
