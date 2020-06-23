import { Expose } from "class-transformer";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

import diskStorageProvider from "../utils/diskStorageProvider";
import Module from "./Module";
import UserCourses from "./UserCourses";

@Entity("courses")
export default class Course {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  modality: string;

  @Column("integer")
  workload: number;

  @Column("float")
  value: number;

  @Column("text")
  description: string;

  @Column("text")
  target_audience: string;

  @BeforeInsert()
  saveThumbnail(): void {
    if (process.env.NODE_ENV === "test") {
      return;
    }

    diskStorageProvider.saveFile(this.thumbnail);

    if (this.practical_exam) {
      diskStorageProvider.saveFile(this.practical_exam);
    }
  }

  @BeforeUpdate()
  updateThumbnail(): void {
    if (process.env.NODE_ENV === "test") {
      return;
    }

    diskStorageProvider.saveFile(this.thumbnail);

    if (this.practical_exam) {
      diskStorageProvider.saveFile(this.practical_exam);
    }
  }

  @Column()
  thumbnail: string;

  thumbnail_url: string;

  @Expose({ name: "thumbnail_url" })
  getThumbnail_url(): string {
    return encodeURI(
      `${process.env.APP_API_URL}/files/uploads/${this.thumbnail}`,
    );
  }

  @Column("integer")
  course_expiration: number;

  @Column("integer")
  certificate_validity: number;

  @Column()
  approved_by: string;

  @Column()
  illustrative_video: string;

  @Column()
  practical_exam: string;

  practical_exam_url: string;

  @Expose({ name: "practical_exam_url" })
  getPractical_exam_url(): string | null {
    if (!this.practical_exam) {
      return null;
    }

    return encodeURI(
      `${process.env.APP_API_URL}/files/uploads/${this.practical_exam}`,
    );
  }

  @Column("varchar", { array: true })
  learns: string[];

  @OneToMany(() => Module, module => module.course, {
    cascade: true,
  })
  modules: Module[];

  @OneToMany(() => UserCourses, userCourses => userCourses.course)
  user_courses: UserCourses[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
