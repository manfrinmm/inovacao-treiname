import { Expose } from "class-transformer";
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
  @ManyToOne(() => Course, course => course.user_courses)
  course: Course;

  @Column("timestamp")
  expires_in: Date;

  @Column()
  exam_submit_id: string;

  @Column()
  certification: string;

  @Expose({ name: "certification_url" })
  getCertification_url(): string | null {
    if (!this.certification) {
      return null;
    }

    return encodeURI(
      `${process.env.APP_API_URL}/files/certifications/${this.certification}`,
    );
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
