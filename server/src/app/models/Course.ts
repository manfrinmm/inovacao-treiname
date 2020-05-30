import { Expose } from "class-transformer";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
} from "typeorm";

import diskStorageProvider from "../utils/diskStorageProvider";
import Module from "./Module";

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

  @Column("integer")
  value: number;

  @Column("text")
  description: string;

  @Column("text")
  target_audience: string;

  @BeforeInsert()
  function(): void {
    if (process.env.NODE_ENV === "test") {
      return;
    }

    diskStorageProvider.saveFile(this.thumbnail);
  }

  @Column()
  thumbnail: string;

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

  @Column("varchar", { array: true })
  learns: string[];

  @OneToMany(() => Module, module => module.course, {
    cascade: true,
  })
  modules: Module[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
