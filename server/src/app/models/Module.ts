import { Expose } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  BeforeInsert,
} from "typeorm";

import diskStorageProvider from "../utils/diskStorageProvider";
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

  @BeforeInsert()
  function(): void {
    if (process.env.NODE_ENV === "test") {
      return;
    }

    diskStorageProvider.saveFile(this.file);
  }

  @Column()
  file: string;

  @Expose({ name: "file_url" })
  getFile_url(): string {
    return encodeURI(`${process.env.APP_API_URL}/files/uploads/${this.file}`);
  }

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
