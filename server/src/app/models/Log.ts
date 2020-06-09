import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import User from "./Admin";

@Entity("logs")
export default class Log {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  local: string;

  @Column()
  ip: string;

  @Column("uuid")
  user_id: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
