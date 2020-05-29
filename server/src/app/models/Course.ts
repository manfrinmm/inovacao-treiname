import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

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

  @Column()
  thumbnail: string;

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