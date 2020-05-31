import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("exam_questions")
export default class ExamQuestion {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  course_id: string;

  @Column()
  title: string;

  @Column()
  answer_a: string;

  @Column()
  answer_b: string;

  @Column()
  answer_c: string;

  @Column()
  answer_d: string;

  @Column()
  correct_answer: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
