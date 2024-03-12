import { MigrationInterface, QueryRunner } from "typeorm";

export class Second1709851425730 implements MigrationInterface {
    name = 'Second1709851425730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" RENAME COLUMN "type" TO "projectTypeId"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "projectTypeId"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "projectTypeId" integer`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_82d3290e03828cc548c69b7fc7a" FOREIGN KEY ("projectTypeId") REFERENCES "project_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_82d3290e03828cc548c69b7fc7a"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "projectTypeId"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "projectTypeId" character varying`);
        await queryRunner.query(`ALTER TABLE "project" RENAME COLUMN "projectTypeId" TO "type"`);
    }

}
