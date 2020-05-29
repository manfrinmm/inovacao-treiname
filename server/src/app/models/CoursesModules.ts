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
import Module from "./Module";

@Entity("courses_modules")
export default class CoursesModules {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  course_id: string;

  @JoinColumn({ name: "course_id" })
  @ManyToOne(() => Course, course => course.course_modules)
  course: Course;

  @Column("uuid")
  module_id: string;

  @JoinColumn({ name: "module_id" })
  @ManyToOne(() => Module)
  module: Module;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
