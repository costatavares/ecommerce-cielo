import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterColumnCustomerPortfolio1637086978227 implements MigrationInterface {
    name = 'AlterColumnCustomerPortfolio1637086978227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer-portfolio" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "customer-portfolio" DROP COLUMN "fone"`);
        await queryRunner.query(`ALTER TABLE "customer-portfolio" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "customer-portfolio" DROP COLUMN "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer-portfolio" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer-portfolio" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer-portfolio" ADD "fone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer-portfolio" ADD "email" character varying NOT NULL`);
    }

}
