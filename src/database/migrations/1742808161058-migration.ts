import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1742808161058 implements MigrationInterface {
  name = 'Migration1742808161058';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "createdBy" SET DEFAULT 'system'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "createdBy" SET DEFAULT 'system'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "createdBy" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "createdBy" DROP DEFAULT`,
    );
  }
}
