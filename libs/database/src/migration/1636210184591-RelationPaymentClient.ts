import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationPaymentClient1636210184591 implements MigrationInterface {
    name = 'RelationPaymentClient1636210184591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "fone" character varying NOT NULL, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "teste"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "id_client" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_6f36e4d010376c2c0fb25a1d98e" FOREIGN KEY ("id_client") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_6f36e4d010376c2c0fb25a1d98e"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "id_client"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "teste" character varying`);
        await queryRunner.query(`DROP TABLE "client"`);
    }

}
