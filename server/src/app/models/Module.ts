import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import CoursesModules from "./CoursesModules";

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

  @OneToMany(() => CoursesModules, coursesModules => coursesModules.module)
  course_modules: CoursesModules[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
