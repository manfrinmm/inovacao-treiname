import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("submit_exams")
export default class SubmitExam {
  @ObjectIdColumn()
  id: ObjectID;

  @Column("uuid")
  course_id: string;

  @Column("uuid")
  user_id: string;

  @Column("number")
  accuracy: number;

  @Column("array", { array: true })
  questions: [
    {
      title: string;
      answer_a: string;
      answer_b: string;
      answer_c: string;
      answer_d: string;
      correct_answer: string;
      answer_mark: string;
    },
  ];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
