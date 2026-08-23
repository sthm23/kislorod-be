import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1724515200000 implements MigrationInterface {
    name = 'InitSchema1724515200000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_type t
          JOIN pg_namespace n ON n.oid = t.typnamespace
          WHERE t.typname = 'order_status_enum' AND n.nspname = 'public'
        ) THEN
          CREATE TYPE "public"."order_status_enum" AS ENUM ('ACTIVE', 'RESERVED', 'CLOSED');
        END IF;
      END
      $$;
    `);

        await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying,
        "telegramId" character varying NOT NULL,
        "telegramUserId" character varying,
        "phone" character varying NOT NULL,
        "username" character varying,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_User_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_User_telegramId" UNIQUE ("telegramId")
      );
    `);

        await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "Report" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "totalOrders" integer NOT NULL,
        "activeOrders" integer NOT NULL,
        "reservedOrders" integer NOT NULL,
        "closedOrders" integer NOT NULL,
        "totalRevenue" double precision NOT NULL,
        "averageOrderValue" double precision NOT NULL,
        CONSTRAINT "PK_Report_id" PRIMARY KEY ("id")
      );
    `);

        await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "Order" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "productName" character varying NOT NULL,
        "startDate" TIMESTAMP NOT NULL,
        "endDate" TIMESTAMP,
        "pricePerDay" double precision NOT NULL,
        "phoneNumber" character varying NOT NULL,
        "location" character varying NOT NULL,
        "status" "public"."order_status_enum" NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP DEFAULT now(),
        "userId" uuid,
        CONSTRAINT "PK_Order_id" PRIMARY KEY ("id")
      );
    `);

        await queryRunner.query(
            'CREATE INDEX IF NOT EXISTS "IDX_Order_userId" ON "Order" ("userId")',
        );

        await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_constraint
          WHERE conname = 'FK_Order_userId_User_id'
        ) THEN
          ALTER TABLE "Order"
          ADD CONSTRAINT "FK_Order_userId_User_id"
          FOREIGN KEY ("userId") REFERENCES "User"("id")
          ON DELETE NO ACTION ON UPDATE NO ACTION;
        END IF;
      END
      $$;
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "Order" DROP CONSTRAINT IF EXISTS "FK_Order_userId_User_id"',
        );
        await queryRunner.query('DROP INDEX IF EXISTS "IDX_Order_userId"');
        await queryRunner.query('DROP TABLE IF EXISTS "Order"');
        await queryRunner.query('DROP TABLE IF EXISTS "Report"');
        await queryRunner.query('DROP TABLE IF EXISTS "User"');
        await queryRunner.query('DROP TYPE IF EXISTS "public"."order_status_enum"');
    }
}
