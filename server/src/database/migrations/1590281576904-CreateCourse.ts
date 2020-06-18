import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateCourse1590281576904 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "courses",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "category",
            type: "varchar",
          },
          {
            name: "modality",
            type: "varchar",
          },
          {
            name: "workload",
            type: "integer",
          },
          {
            name: "value",
            type: "float",
          },
          {
            name: "description",
            type: "text",
          },
          {
            name: "target_audience",
            type: "text",
          },
          {
            name: "thumbnail",
            type: "varchar",
          },
          {
            name: "course_expiration",
            type: "integer",
          },
          {
            name: "certificate_validity",
            type: "integer",
          },
          {
            name: "approved_by",
            type: "varchar",
          },
          {
            name: "illustrative_video",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "practical_exam",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "learns",
            type: "varchar",
            isArray: true,
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "now()",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("courses");
  }
}
