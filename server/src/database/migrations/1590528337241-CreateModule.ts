import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateModule1590528337241 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "course_modules",
        columns: [
          {
            name: "id",
            type: "uuid",
            generationStrategy: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "text",
          },
          {
            name: "video_link",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "extra_link",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "file",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("course_modules");
  }
}
