import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnSalesman1636203557349 implements MigrationInterface {
    name = 'AddColumnSalesman1636203557349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salesman" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "salesman" ADD "fone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "salesman" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "salesman" ADD "created_at" date NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salesman" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "salesman" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "salesman" DROP COLUMN "fone"`);
        await queryRunner.query(`ALTER TABLE "salesman" DROP COLUMN "name"`);
    }

}
