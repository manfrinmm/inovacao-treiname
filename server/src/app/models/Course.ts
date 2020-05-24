import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export default class Course {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  modality: string;

  @Column("number")
  workload: number;

  @Column("number")
  value: number;

  @Column("text")
  description: string;

  @Column("text")
  target_audience: string;

  @Column()
  thumbnail: string;

  @Column("number")
  course_expiration: number;

  @Column("number")
  certificate_validity: number;

  @Column()
  approved_by: string;

  @Column()
  illustrative_video: string;

  @Column({ array: true })
  learns: string;

  @Column({ array: true })
  modules: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
