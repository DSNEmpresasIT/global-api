import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709580361402 implements MigrationInterface {
    name = 'Migration1709580361402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recaptcha_key" ("id" SERIAL NOT NULL, "key" character varying, "secret_key" character varying, CONSTRAINT "PK_4d66fa6fbce7fae4c9647997725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "email_keys" ("id" SERIAL NOT NULL, "host" character varying, "user" character varying, "port" integer, "email" character varying, "password" character varying, CONSTRAINT "PK_b084d9beede42244cd1e6c3bc5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cloudinary_keys" ("id" SERIAL NOT NULL, "cloud_name" character varying, "api_key" character varying, "api_secret" character varying, CONSTRAINT "PK_b29a321ae521ef157cbeb0b014e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_keys" ("id" SERIAL NOT NULL, "supabaseUrl" character varying, "supabaseKey" character varying, "instagram_key" character varying, "recaptchaKeysId" integer, "emailKeysId" integer, "cloudinaryKeysId" integer, CONSTRAINT "REL_742061a84f42dac1392ca307e4" UNIQUE ("recaptchaKeysId"), CONSTRAINT "REL_23213afc9b68323feefd7e1157" UNIQUE ("emailKeysId"), CONSTRAINT "REL_b3d21ba97353b4fac68f994bc7" UNIQUE ("cloudinaryKeysId"), CONSTRAINT "PK_54869dee1b9c72ea10b669c4308" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "company_name" character varying NOT NULL, "keysId" integer, CONSTRAINT "REL_ffcc0b292aec6cea63d5a9cdb5" UNIQUE ("keysId"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'DSN_CUSTOMER_ACCESS', "companyId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company_keys" ADD CONSTRAINT "FK_742061a84f42dac1392ca307e4a" FOREIGN KEY ("recaptchaKeysId") REFERENCES "recaptcha_key"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_keys" ADD CONSTRAINT "FK_23213afc9b68323feefd7e11571" FOREIGN KEY ("emailKeysId") REFERENCES "email_keys"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_keys" ADD CONSTRAINT "FK_b3d21ba97353b4fac68f994bc7d" FOREIGN KEY ("cloudinaryKeysId") REFERENCES "cloudinary_keys"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_ffcc0b292aec6cea63d5a9cdb5c" FOREIGN KEY ("keysId") REFERENCES "company_keys"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_86586021a26d1180b0968f98502" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_86586021a26d1180b0968f98502"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_ffcc0b292aec6cea63d5a9cdb5c"`);
        await queryRunner.query(`ALTER TABLE "company_keys" DROP CONSTRAINT "FK_b3d21ba97353b4fac68f994bc7d"`);
        await queryRunner.query(`ALTER TABLE "company_keys" DROP CONSTRAINT "FK_23213afc9b68323feefd7e11571"`);
        await queryRunner.query(`ALTER TABLE "company_keys" DROP CONSTRAINT "FK_742061a84f42dac1392ca307e4a"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "company_keys"`);
        await queryRunner.query(`DROP TABLE "cloudinary_keys"`);
        await queryRunner.query(`DROP TABLE "email_keys"`);
        await queryRunner.query(`DROP TABLE "recaptcha_key"`);
    }

}
