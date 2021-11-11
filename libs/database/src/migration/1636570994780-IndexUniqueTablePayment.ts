import {MigrationInterface, QueryRunner} from "typeorm";

export class IndexUniqueTablePayment1636570994780 implements MigrationInterface {
    name = 'IndexUniqueTablePayment1636570994780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_28f823091ff91a736d72a206e0" ON "payment" ("payment_number") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_28f823091ff91a736d72a206e0"`);
    }

}
