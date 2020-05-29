import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import Course from "./Course";

@Entity("course_modules")
export default class CourseModule {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column("text")
  description: string;

  @Column()
  video_link: string;

  @Column()
  extra_link: string;

  @Column()
  file: string;

  @Column()
  course_id: string;

  @JoinColumn({ name: "course_id" })
  @ManyToOne(() => Course)
  course: Course;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
