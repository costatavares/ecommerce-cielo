import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationCustonmerPortfolioTransaction1636213048030 implements MigrationInterface {
    name = 'RelationCustonmerPortfolioTransaction1636213048030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "id_customer_portfolio" integer NOT NULL, "amount" numeric(5,2) NOT NULL DEFAULT '0', "added_amount" numeric(5,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_f73af80b45d0cdaed754d3e5a88" FOREIGN KEY ("id_customer_portfolio") REFERENCES "customer-portfolio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_f73af80b45d0cdaed754d3e5a88"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}
