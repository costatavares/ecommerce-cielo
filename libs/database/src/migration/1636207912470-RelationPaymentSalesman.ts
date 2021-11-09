import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationPaymentSalesman1636207912470 implements MigrationInterface {
    name = 'RelationPaymentSalesman1636207912470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD "id_salesman" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_8ddf7ebc5cf20c40bb19c228915" FOREIGN KEY ("id_salesman") REFERENCES "salesman"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_8ddf7ebc5cf20c40bb19c228915"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "id_salesman"`);
    }

}
