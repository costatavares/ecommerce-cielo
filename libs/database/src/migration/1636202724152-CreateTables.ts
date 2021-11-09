import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1636202724152 implements MigrationInterface {
    name = 'CreateTables1636202724152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "salesman" ("id" SERIAL NOT NULL, CONSTRAINT "PK_f2a2da02f674976f194d7f9d5c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer-portfolio" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "id_salesman" integer NOT NULL, "address" character varying NOT NULL, "fone" character varying NOT NULL, "email" character varying NOT NULL, "purchase_date" date NOT NULL, "value_last_purchase" character varying NOT NULL, CONSTRAINT "REL_e9057cedc16047f6c57297b3ca" UNIQUE ("id_salesman"), CONSTRAINT "PK_89f8520c936e212f74ef770ad5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying, "teste" character varying, "user_type" integer, "created_at" date NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "customer-portfolio" ADD CONSTRAINT "FK_e9057cedc16047f6c57297b3ca3" FOREIGN KEY ("id_salesman") REFERENCES "salesman"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer-portfolio" DROP CONSTRAINT "FK_e9057cedc16047f6c57297b3ca3"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "customer-portfolio"`);
        await queryRunner.query(`DROP TABLE "salesman"`);
    }

}
