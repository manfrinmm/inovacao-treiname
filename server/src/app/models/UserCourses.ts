import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import User from "./Admin";
import Course from "./Course";

@Entity("user_courses")
export default class UserCourses {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User)
  users: User;

  @Column()
  course_id: string;

  @JoinColumn({ name: "course_id" })
  @ManyToOne(() => Course)
  courses: Course;

  @Column("timestamp")
  expires_in: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
