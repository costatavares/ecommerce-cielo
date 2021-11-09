import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationPaymentCard1636207229776 implements MigrationInterface {
    name = 'RelationPaymentCard1636207229776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "payment_number" numeric NOT NULL, "amount" numeric(5,2) NOT NULL DEFAULT '0', "amount_paid" numeric(5,2) NOT NULL DEFAULT '0', "id_card" integer NOT NULL, CONSTRAINT "REL_55e62bf30862f30f8536d906d6" UNIQUE ("id_card"), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card" ("id" SERIAL NOT NULL, "card_number" integer NOT NULL, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_55e62bf30862f30f8536d906d6c" FOREIGN KEY ("id_card") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_55e62bf30862f30f8536d906d6c"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TABLE "payment"`);
    }

}
