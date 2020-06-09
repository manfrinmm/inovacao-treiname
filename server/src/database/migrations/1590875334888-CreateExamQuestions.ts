import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateExamQuestions1590875334888
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "exam_questions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "course_id",
            type: "uuid",
          },
          {
            name: "title",
            type: "text",
          },
          {
            name: "answer_a",
            type: "text",
          },
          {
            name: "answer_b",
            type: "text",
          },
          {
            name: "answer_c",
            type: "text",
          },
          {
            name: "answer_d",
            type: "text",
          },
          {
            name: "correct_answer",
            type: "varchar",
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
        foreignKeys: [
          {
            name: "course_exam",
            columnNames: ["course_id"],
            referencedTableName: "courses",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("exam_questions");
  }
}
