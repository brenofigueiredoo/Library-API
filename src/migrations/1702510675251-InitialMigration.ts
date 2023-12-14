import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1702510675251 implements MigrationInterface {
    name = 'InitialMigration1702510675251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_book_manager" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isBusyForYou" boolean NOT NULL DEFAULT true, "createdAt" date NOT NULL DEFAULT now(), "userId" uuid, "bookId" uuid, CONSTRAINT "PK_bf795a75e740420d10fb4b2eba5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "author" character varying NOT NULL, "genre" character varying NOT NULL, "publicationDate" date NOT NULL, "isBusy" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_book_manager" ADD CONSTRAINT "FK_67080a41861aaae26cc70b4a9fa" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_book_manager" ADD CONSTRAINT "FK_2c408ae67d9d6e10e18533f4745" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_book_manager" DROP CONSTRAINT "FK_2c408ae67d9d6e10e18533f4745"`);
        await queryRunner.query(`ALTER TABLE "user_book_manager" DROP CONSTRAINT "FK_67080a41861aaae26cc70b4a9fa"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "user_book_manager"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
