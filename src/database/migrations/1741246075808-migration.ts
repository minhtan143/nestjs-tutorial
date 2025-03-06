import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741246075808 implements MigrationInterface {
  name = 'Migration1741246075808';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, "deletedBy" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
